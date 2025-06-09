import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import userIcon from '../../assets/user.svg';
import UserBtn from './UserBtn';
import UserForm from './UserForm';
import Logout from './Logout';
// import { uploadImage } from '../../firebase';

export default function User() {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('personal');
    const [error, setError] = useState(null);
    const [profileImage, setProfileImage] = useState(userIcon);
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: {
            city: '',
            region: '',
            street: '',
        },
        profilePictureUrl: '',
        imageUrl: null,
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
                    },
                    profilePictureUrl: userData.profilePictureUrl || '',
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
                    },
                    profilePictureUrl: userData.profilePictureUrl || '',
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

            const tokenParts = token.split('.');
            if (tokenParts.length !== 3) {
                throw new Error('Invalid token format');
            }

            const tokenPayload = JSON.parse(atob(tokenParts[1]));
            const userId = tokenPayload.userId;
            if (!userId) {
                throw new Error('No user ID found in token');
            }

            const formDataToSend = new FormData();
            formDataToSend.append('id', userId);
            formDataToSend.append('userName', `${formData.firstName}${formData.lastName}`);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('firstName', formData.firstName);
            formDataToSend.append('lastName', formData.lastName);
            formDataToSend.append('isActive', 'true');
            formDataToSend.append('address.city', formData.address?.city || '');
            formDataToSend.append('address.region', formData.address?.region || '');
            formDataToSend.append('address.street', formData.address?.street || '');

            formDataToSend.append('profilePictureUrl', formData.profilePictureUrl || '');
            console.log(formData.imageUrl.value);
            if (formData.imageUrl instanceof File) {
                formDataToSend.append('imageUrl', formData.imageUrl);
            }

            const response = await fetch(`https://shatably.runasp.net/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formDataToSend
            });


            let responseData;
            const contentType = response.headers.get('content-type') || '';
            if (contentType.includes('multipart/form-data')) {
                responseData = await response.json();
            } else {
                responseData = await response.text();
            }

            if (!response.ok) {
                let errorMessage = 'Unknown error';
                if (typeof responseData === 'string') {
                    errorMessage = responseData;
                } else if (responseData && (responseData.message || responseData.title || responseData.error)) {
                    errorMessage = responseData.message || responseData.title || responseData.error;
                } else {
                    errorMessage = `Server returned status ${response.status}`;
                }
                throw new Error(errorMessage);
            }

            setError(null);
            console.log('Update successful');
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

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfileImage(event.target.result); // Show preview
            };
            reader.readAsDataURL(file);

            setFormData(prev => ({
                ...prev,
                imageUrl: file
            }));
        }
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
    const baseClasses = 'w-full py-2 px-4 text-left rounded-[25px] border-none text-[#16404D]';
    const activeClasses = 'bg-[#16404d] text-[#ffffff] font-medium';

    return (
        <div className="container mx-auto px-4 py-8 m-auto">
            <div className="max-w-6xl mx-auto bg-white rounded-[25px] shadow-sm p-8 mt-10">
                <div className="flex">
                    <div className="w-1/4 pr-8">
                        <div className="flex flex-col items-center">
                            <div
                                className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center relative group cursor-pointer hover:bg-gray-200 transition-all duration-300 overflow-hidden"
                                onClick={handleImageClick}
                            >
                                <img
                                    src={!formData.profilePictureUrl ? profileImage : formData.profilePictureUrl}
                                    alt="Profile"
                                    className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-full transition-all duration-300">
                                    <span className="text-white opacity-0 group-hover:opacity-100 text-sm font-medium">
                                        Change Photo
                                    </span>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="hidden"
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
                                    className={`${baseClasses} ${activeSection === 'personal' ? activeClasses : ''}`}
                                >
                                    Personal Information
                                </UserBtn>
                                <UserBtn
                                    isActive={activeSection === 'logout'}
                                    onClick={() => handleSectionChange('logout')}
                                    className={`${baseClasses} text-[#DDA853] ${activeSection === 'logout' ? activeClasses : ''}`}
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