import './navbar.css';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import searchicon from '../../../assets/search-normal.svg';
import cart from '../../../assets/cart.svg';
import user from '../../../assets/user.svg';
import vector from '../../../assets/Vector.svg';
import paymentIcon from '../../../assets/Payment.svg';
import bookingIcon from '../../../assets/Booking.svg';
import successIcon from '../../../assets/Success.svg';
import { useAuth } from '../../../context/AuthContext';
import { useSearch } from '../../../context/SearchContext';
import logo from '../../../assets/logo.png';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState(() => {
        const savedNotifications = localStorage.getItem('notifications');
        return savedNotifications ? JSON.parse(savedNotifications) : [];
    });
    const [hasNewNotifications, setHasNewNotifications] = useState(() => {
        const savedNotifications = localStorage.getItem('notifications');
        if (savedNotifications) {
            const parsed = JSON.parse(savedNotifications);
            return parsed.some(n => n.isNew);
        }
        return false;
    });
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const auth = useAuth();
    const { searchTerm, setSearchTerm } = useSearch();
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
            addNotification('Successfully logged in', 'now', 'success');
        }
    }, [auth?.isLoggedIn]);

    // Add notification when verification code is sent
    useEffect(() => {
        if (location.pathname === '/forgot-password' && location.state?.codeSent) {
            addNotification('Verification code has been sent to your email', 'now', 'success');
        }
    }, [location]);

    // Listen for cart updates
    useEffect(() => {
        const handleCartUpdate = (event) => {
            setCartItemsCount(event.detail.count);
        };

        const handlePaymentNotification = (event) => {
            console.log('Payment notification received:', event.detail);
            addNotification(event.detail.message, event.detail.time, event.detail.type);
        };

        window.addEventListener('cartUpdate', handleCartUpdate);
        window.addEventListener('paymentNotification', handlePaymentNotification);

        return () => {
            window.removeEventListener('cartUpdate', handleCartUpdate);
            window.removeEventListener('paymentNotification', handlePaymentNotification);
        };
    }, []);

    // Fetch cart count when component mounts and when location changes
    useEffect(() => {
        async function updateCartCount() {
            if (!auth?.isLoggedIn) return;

            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const tokenParts = token.split('.');
                if (tokenParts.length !== 3) return;

                const tokenPayload = JSON.parse(atob(tokenParts[1]));
                const userId = tokenPayload.userId;
                if (!userId) return;

                const response = await fetch(`https://shatably.runasp.net/api/Basket/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) return;

                const data = await response.json();
                const totalItems = data?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
                setCartItemsCount(totalItems);
            } catch (error) {
                console.error('Error fetching cart count:', error);
            }
        }

        updateCartCount();
    }, [auth?.isLoggedIn, location.pathname]);

    const addNotification = (message, time, type = 'payment') => {
        const newNotification = {
            id: Date.now(),
            message,
            time,
            isNew: true,
            type
        };
        setNotifications(prev => {
            const updated = [newNotification, ...prev];
            localStorage.setItem('notifications', JSON.stringify(updated));
            return updated;
        });
        setHasNewNotifications(true);
    };

    const deleteNotification = (id) => {
        setNotifications(prev => {
            const updated = prev.filter(notification => notification.id !== id);
            localStorage.setItem('notifications', JSON.stringify(updated));
            return updated;
        });
    };

    const toggleNotification = () => {
        setIsNotificationOpen(!isNotificationOpen);
        if (hasNewNotifications) {
            setHasNewNotifications(false);
            setNotifications(prev => {
                const updated = prev.map(notification => ({
                    ...notification,
                    isNew: false
                }));
                localStorage.setItem('notifications', JSON.stringify(updated));
                return updated;
            });
        }
    };

    if (!auth) return null;

    const { isLoggedIn, logout } = auth;

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
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

    const handleMouseLeave = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="nav">
            <div className="side-nav" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>

            <div 
                className={`sections-pages ${isMenuOpen ? 'active' : ''}`}
                onMouseLeave={handleMouseLeave}
            >
                <Link to="/" className={`pages ${isActive('/') ? 'active' : ''}`}>Home</Link>
                <Link to="/services" className={`pages ${isActive('/services') ? 'active' : ''}`}>Services</Link>
                <Link to="/Shop" className={`pages ${isActive('/Shop') ? 'active' : ''}`}>Shop</Link>
                <Link to="/ai" className={`pages ${isActive('/ai') ? 'active' : ''}`}>AI</Link>
            </div>
            <div className="sections-logo">
                <Link to="/">
                    <img src={logo} alt="shatably logo" className='h-14' />
                </Link>
            </div>
            <div className="sections-icons">
                <div className="search-container">
                    <input
                        type="search"
                        className="search-bar"
                        placeholder='Search'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        hidden={!(location.pathname === '/services' || location.pathname === '/Shop')}
                    />
                    <img src={searchicon} hidden={!(location.pathname === '/services' || location.pathname === '/Shop')} className="search-icon" alt="search" />
                </div>
                <div className="icon-section">
                    {isLoggedIn ? (
                        <div className="relative ml-3">
                            <div className="flex gap-3 items-center">
                                <Link to="/Cart" className="relative">
                                    <div className='icon'>
                                        <img src={cart} className={`icon ${isActive('/Cart') ? 'active' : ''} cursor-pointer`} alt="cart" />
                                        {cartItemsCount > 0 && (
                                            <div className="cart-section absolute -top-2 -right-[10px] bg-[#dda853cc] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                                {cartItemsCount}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                                <div className="relative icon" ref={notificationRef}>
                                    <img
                                        src={vector}
                                        className={`icon cursor-pointer`}
                                        alt="notification"
                                        onClick={toggleNotification}
                                    />
                                    {hasNewNotifications && (
                                        <div className="absolute -top-1 right-[6px] w-2 h-2 bg-red-500 rounded-full"></div>
                                    )}
                                    {isNotificationOpen && (
                                        <div className="absolute right-0 mt-5 w-80 bg-white rounded-md shadow-lg py-1 z-50">
                                            <div className="px-4 py-2 border-b border-gray-100">
                                                <h3 className="text-sm font-semibold">Notifications</h3>
                                            </div>
                                            {notifications.length > 0 ? (
                                                <div className="max-h-60 overflow-y-auto scrollbar-hide">
                                                    {notifications.map(notification => (
                                                        <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 relative group">
                                                            <div className="flex items-start gap-3">
                                                                <img
                                                                    src={
                                                                        notification.type === 'payment' ? paymentIcon :
                                                                            notification.type === 'booking' ? bookingIcon :
                                                                                notification.type === 'success' ? successIcon :
                                                                                    bookingIcon
                                                                    }
                                                                    alt={notification.type === 'payment' ? 'Payment' :
                                                                        notification.type === 'booking' ? 'Booking' :
                                                                            notification.type === 'success' ? 'Success' :
                                                                                'Notification'}
                                                                    className="w-6 h-6 mt-1"
                                                                />
                                                                <div className="flex-1">
                                                                    <p className="text-sm">{notification.message}</p>
                                                                    <p className="text-xs mt-1 text-gray-500">{notification.time}</p>
                                                                </div>
                                                                <button
                                                                    onClick={() => deleteNotification(notification.id)}
                                                                    className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                                >
                                                                    ×
                                                                </button>
                                                            </div>
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
                                <div className="relative mr-[0.5rem]" ref={profileRef}>
                                    <div className='icon'>
                                        <img
                                        src={user}
                                        className={`icon ${isActive('/User') ? 'active' : ''} cursor-pointer`}
                                        alt="user"
                                        onClick={toggleProfile}
                                    />
                                    </div>
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
                        <div className="loginn flex flex-row items-center gap-4 ml-[1rem]">
                            <button className="bg-[#16404D] text-white rounded-[10px] login" onClick={() => navigate('/login')}>
                                Login
                            </button>
                            <button className="text-[#16404D] hover:opacity-80 text-sm font-medium whitespace-nowrap signup" onClick={() => navigate('/RegisterationPage')}>Sign-up</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}