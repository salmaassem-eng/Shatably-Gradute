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

                console.log('Fetching user data for ID:', userId);

                const response = await fetch(`https://shatably.runasp.net/api/users/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch user data: ${response.status}`);
                }

                const userData = await response.json();
                console.log('Received user data:', userData);

                setFormData({
                    userName: userData.userName || `${userData.firstName} ${userData.lastName}`,
                    email: userData.email || '',
                    firstName: userData.firstName || '',
                    lastName: userData.lastName || '',
                    address: {
                        city: userData.address?.city || '',
                        region: userData.address?.region || '',
                        street: userData.address?.street || ''
                    }
                });
                
                setError(null);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to load user data. Please try again.');
            }
        }

        fetchUserData();
    }, [isLoggedIn, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Handle nested address fields
        if (name === 'city' || name === 'region' || name === 'street') {
            setFormData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [name]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
                // Update userName when first or last name changes
                ...(name === 'firstName' || name === 'lastName' ? {
                    userName: name === 'firstName' ? 
                        `${value} ${prev.lastName}` : 
                        `${prev.firstName} ${value}`
                } : {})
            }));
        }
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

                console.log('Fetching user data for ID:', userId);

                const response = await fetch(`https://shatably.runasp.net/api/users/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch user data: ${response.status}`);
                }

                const userData = await response.json();
                console.log('Received user data:', userData);

                // Update form data with user data
                setFormData({
                    userName: userData.userName || `${userData.firstName} ${userData.lastName}`,
                    email: userData.email || '',
                    firstName: userData.firstName || '',
                    lastName: userData.lastName || '',
                    address: {
                        city: userData.address?.city || '',
                        region: userData.address?.region || '',
                        street: userData.address?.street || ''
                    }
                });
                
                setError(null);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to load user data. Please try again.');
            }
        }
        fetchUserData();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Starting form submission with data:', formData);

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

            // Construct payload to match backend schema exactly
            const payload = {
                id: userId, // ← Add this line
                userName: formData.userName,
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
                isActive: true,
                address: {
                    city: formData.address.city,
                    region: formData.address.region,
                    street: formData.address.street
                }
            };
            

            console.log('Sending update request to:', `https://shatably.runasp.net/api/users/${userId}`);
            console.log('With payload:', payload);

            const response = await fetch(`https://shatably.runasp.net/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const responseText = await response.text();
            console.log('Response text:', responseText);

            if (!response.ok) {
                let errorMessage;
                try {
                    const errorData = JSON.parse(responseText);
                    errorMessage = errorData.message || errorData.title || errorData.error;
                } catch (parseError) {
                    console.warn('Failed to parse error response:', parseError);
                    errorMessage = responseText;
                }

                throw new Error(errorMessage || `Server returned ${response.status}`);
            }

            setError(null);
            console.log('Update successful');
            
            // Force a fresh data fetch to confirm changes
            handleDiscard();
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
        <div className="container mx-auto px-4 py-8 m-auto">
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