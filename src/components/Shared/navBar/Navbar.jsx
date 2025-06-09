import './navbar.css';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import searchicon from '../../../assets/search-normal.svg';
import card from '../../../assets/cart.svg';
import user from '../../../assets/user.svg';
import vector from '../../../assets/Vector.svg';
import { useAuth } from '../../../context/AuthContext';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const auth = useAuth();
    const profileRef = useRef(null);
    const notificationRef = useRef(null);
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsNotificationOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Add notification when user logs in
    useEffect(() => {
        if (auth?.isLoggedIn) {
            addNotification('Successfully logged in', 'now');
        }
    }, [auth?.isLoggedIn]);

    // Add notification when verification code is sent
    useEffect(() => {
        if (location.pathname === '/forgot-password' && location.state?.codeSent) {
            addNotification('Verification code has been sent to your email', 'now');
        }
    }, [location]);

    const addNotification = (message, time) => {
        setNotifications(prev => [{
            id: Date.now(),
            message,
            time
        }, ...prev]);
    };
    
    if (!auth) return null;
    
    const { isLoggedIn, logout } = auth;

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
    const toggleNotification = () => setIsNotificationOpen(!isNotificationOpen);
    const isActive = (path) => location.pathname === path;
    const handleLogout = () => {
        if (logout) {
            logout();
            setIsProfileOpen(false);
        }
    };
    const handleViewProfile = () => {
        navigate('/User');
        setIsProfileOpen(false);
    };

    return (
        <nav className="nav">
            <div className="side-nav" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>

            <div className={`sections-pages ${isMenuOpen ? 'active' : ''}`}>
                <Link to="/" className={`pages ${isActive('/') ? 'active' : ''}`}>Home</Link>
                <Link to="/services" className={`pages ${isActive('/services') ? 'active' : ''}`}>Services</Link>
                <Link to="/community" className={`pages ${isActive('/community') ? 'active' : ''}`}>Shop</Link>
                <Link to="/ai" className={`pages ${isActive('/ai') ? 'active' : ''}`}>AI</Link>
            </div>
            <div className="sections-logo">
                <p>shatably</p>
            </div>
            <div className="sections-icons">
                <div className="search-container">
                    <input type="search" className="search-bar" placeholder='Search'/>
                    <img src={searchicon} className="search-icon" alt="search" />
                </div>
                <div className="icon-section">
                    {isLoggedIn ? (

                        <div className="relative ml-3">
                            <div className="flex items-center">

                                <img src={card} className="icon" alt="cart" />
                                <div className="relative" ref={notificationRef}>
                                    <img 
                                        src={vector} 
                                        className="icon cursor-pointer" 
                                        alt="notification"
                                        onClick={toggleNotification}
                                    />
                                    {isNotificationOpen && (
                                        <div className="absolute right-0 mt-5 w-60 bg-white rounded-md shadow-lg py-1 z-50">
                                            <div className="px-4 py-2 border-b border-gray-100">
                                                <h3 className="text-sm font-semibold">Notifications</h3>
                                            </div>
                                            {notifications.length > 0 ? (
                                                <div className="max-h-60 overflow-y-auto">
                                                    {notifications.map(notification => (
                                                        <div key={notification.id} className="px-4 py-3 hover:bg-gray-50">
                                                            <p className="text-sm">{notification.message}</p>
                                                            <p className="text-xs mt-1">{notification.time}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="px-4 py-3 text-sm text-gray-500">
                                                    No notifications
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="relative" ref={profileRef}>
                                    <img 
                                        src={user} 
                                        className={`icon ${isActive('/User') ? 'active' : ''} cursor-pointer`} 
                                        alt="user"
                                        onClick={toggleProfile}
                                    />
                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-5 w-32 bg-white rounded-md shadow-lg py-1 z-50">
                                            <button
                                                onClick={handleViewProfile}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                            >
                                                View Profile
                                            </button>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-200"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <button className="bg-[#16404D] loginBtn" onClick={() => navigate('/login')}>
                                <p>Login</p>
                            </button>
                            <Link
                                to="/RegisterationPage"
                                className="text-[#16404D] hover:opacity-80 text-sm font-medium"
                            >
                                Sign up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}