import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import userIcon from '../../assets/user.svg';
import UserBtn from './UserBtn';
import UserForm from './UserForm';
import Logout from './Logout';

export default function User() {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('personal');
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: {
            city: '',
            region: '',
            street: '',
        },
    });

    // Handle authentication check and data fetching
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        async function fetchUserData() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No authentication token found');
                }

                // Decode the JWT token to get the token payload
                const tokenParts = token.split('.');
                if (tokenParts.length !== 3) {
                    throw new Error('Invalid token format');
                }

                const tokenPayload = JSON.parse(atob(tokenParts[1]));
                console.log('Token payload:', tokenPayload);

                // Get userId from token
                const userId = tokenPayload.userId;
                if (!userId) {
                    throw new Error('No user ID found in token');
                }

                console.log('Attempting to fetch data for user ID:', userId);

                const response = await fetch(`https://shatably.runasp.net/api/users/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Server response:', {
                        status: response.status,
                        statusText: response.statusText,
                        body: errorText
                    });
                    throw new Error(`Server returned ${response.status}: ${errorText}`);
                }

                const resData = await response.json();
                console.log('Received user data:', resData);

                setFormData({
                    firstName: resData.firstName || '',
                    lastName: resData.lastName || '',
                    email: resData.email || tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || '',
                    city: resData.city || '',
                    region: resData.region || '',
                    street: resData.street || '',
                });
                setError(null);
            } catch (err) {
                console.error('Detailed error:', err);
                setError('Failed to load user data. Please try again.');
            }
        }

        fetchUserData();
    }, [isLoggedIn, navigate]);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDiscard = () => {
        async function fetchUserData() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No authentication token found');
                }

                // Decode the JWT token to get the token payload
                const tokenParts = token.split('.');
                if (tokenParts.length !== 3) {
                    throw new Error('Invalid token format');
                }

                const tokenPayload = JSON.parse(atob(tokenParts[1]));
                console.log('Token payload:', tokenPayload);

                // Get userId from token
                const userId = tokenPayload.userId;
                if (!userId) {
                    throw new Error('No user ID found in token');
                }

                console.log('Attempting to fetch data for user ID:', userId);

                const response = await fetch(`https://shatably.runasp.net/api/users/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Server response:', {
                        status: response.status,
                        statusText: response.statusText,
                        body: errorText
                    });
                    throw new Error(`Server returned ${response.status}: ${errorText}`);
                }

                const resData = await response.json();
                console.log('Received user data:', resData);

                setFormData({
                    firstName: resData.firstName || '',
                    lastName: resData.lastName || '',
                    email: resData.email || tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || '',
                    city: resData.city || '',
                    region: resData.region || '',
                    street: resData.street || '',
                });
                setError(null);
            } catch (err) {
                console.error('Detailed error:', err);
                setError('Failed to load user data. Please try again.');
            }
        }
        fetchUserData();
    };


    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        // Decode the JWT token to get the userId
        const tokenParts = token.split('.');
        if (tokenParts.length !== 3) {
            throw new Error('Invalid token format');
        }

        const tokenPayload = JSON.parse(atob(tokenParts[1]));
        console.log('Token payload:', tokenPayload); // For debugging

        // Try several claim keys that might contain the user ID
        const userId =
            tokenPayload.userId ||
            tokenPayload.sub ||
            tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

        if (!userId) {
            throw new Error('No user ID found in token');
        }

        console.log('Using userId for request:', userId);

        const payload = {
            userName: `${formData.firstName} ${formData.lastName}`,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            address: {
                city: formData.city,
                region: formData.region,
                street: formData.street,
            },
        };

        const response = await fetch(`https://shatably.runasp.net/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();

            if (response.status === 404) {
                throw new Error('User not found (404). The user ID might be incorrect or the user may not exist.');
            }

            throw new Error(`Failed to update user: ${response.status} - ${errorText}`);
        }

        setError(null);
        console.log('User updated successfully.');
    } catch (err) {
        console.error('Error updating user data:', err);
        setError(err.message || 'Failed to update user data. Please try again.');
    }
};





    const handleSectionChange = (section) => {
        setActiveSection(section);
        setError(null);
    };

    const renderContent = () => {
        if (activeSection === 'logout') {
            return <Logout onCancel={() => setActiveSection('personal')} />;
        }

        return (
            <div>
                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600">{error}</p>
                    </div>
                )}
                <UserForm
                    formData={formData}
                    onSubmit={handleSubmit}
                    onChange={handleChange}
                    onDiscard={handleDiscard}
                />
            </div>
        );
    };

    // If not logged in, render nothing while the useEffect handles navigation
    if (!isLoggedIn) return null;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto bg-white rounded-[25px] shadow-sm p-8 mt-10">
                <div className="flex">
                    <div className="w-1/4 pr-8">
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                                <img
                                    src={userIcon}
                                    alt="Profile"
                                    className="w-16 h-16"
                                />
                            </div>
                            <h2 className="mt-4 text-xl font-semibold text-[#16404D]">
                                {`${formData.firstName} ${formData.lastName}`}
                            </h2>
                            <p className="text-gray-500">User</p>

                            <div className="w-full mt-8 space-y-2">
                                <UserBtn
                                    isActive={activeSection === 'personal'}
                                    onClick={() => handleSectionChange('personal')}
                                >
                                    Personal Information
                                </UserBtn>
                                <UserBtn
                                    isActive={activeSection === 'logout'}
                                    onClick={() => handleSectionChange('logout')}
                                >
                                    Log Out
                                </UserBtn>
                            </div>
                        </div>
                    </div>

                    <div className="w-3/4 pl-8">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}