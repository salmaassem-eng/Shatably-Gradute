import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import userIcon from '../../assets/user.svg';
import UserBtn from './UserBtn';
import UserForm from './UserForm';
import Logout from './Logout';

export default function User() {
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('personal');
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    });

    // Handle authentication check and data fetching
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }
    
        if (!user?.id) {
            console.log('Waiting for user ID...');
            return;
        }
    
        async function fetchUserData() {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`https://shatably.runasp.net/api/clients/${user.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
    
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Failed to fetch user data: ${response.status} ${response.statusText} - ${errorText}`);
                }
    
                const resData = await response.json();
                setFormData({
                    firstName: resData.firstName || '',
                    lastName: resData.lastName || '',
                    email: resData.email || '',
                    phoneNumber: resData.mobileNumber || '',
                });
                setError(null);
            } catch (err) {
                setError('Failed to load user data. Please try again.');
                console.error('Error fetching user data:', err);
            }
        }
    
        fetchUserData();
    }, [isLoggedIn, user, navigate]);
    
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDiscard = () => {
        // Reset form to original values by refetching
        async function resetData() {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`https://shatably.runasp.net/api/clients/${user.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                
                const resData = await response.json();
                setFormData({
                    firstName: resData.firstName || '',
                    lastName: resData.lastName || '',
                    email: resData.email || '',
                    phoneNumber: resData.mobileNumber || '',
                });
                setError(null);
            } catch (err) {
                setError('Failed to reset form. Please try again.');
                console.error('Error resetting form:', err);
            }
        }

        resetData();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user?.id) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://shatably.runasp.net/api/clients/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    mobileNumber: formData.phoneNumber,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update user data');
            }

            setError(null);
        } catch (err) {
            setError('Failed to update user data. Please try again.');
            console.error('Error updating user data:', err);
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