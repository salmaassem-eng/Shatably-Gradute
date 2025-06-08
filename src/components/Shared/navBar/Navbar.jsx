import './navbar.css';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import searchicon from '../../../assets/search-normal.svg';
import card from '../../../assets/cart.svg';
import user from '../../../assets/user.svg';
import vector from '../../../assets/Vector.svg';
import { useAuth } from '../../../context/AuthContext';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const auth = useAuth();
    
    // Early return if auth context is not yet initialized
    if (!auth) {
        return null;
    }
    
    const { isLoggedIn, logout } = auth;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const handleLogout = () => {
        if (logout) {
            logout();
        }
    };

    return (
        <nav className="nav">
            <div className="side-nav" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>

            <div className={`sections-pages ${isMenuOpen ? 'active' : ''}`}>
                <Link to="/" className={`pages ${isActive('/') ? 'active' : ''}`}>home</Link>
                <Link to="/services" className={`pages ${isActive('/services') ? 'active' : ''}`}>services</Link>
                <Link to="/community" className={`pages ${isActive('/community') ? 'active' : ''}`}>community</Link>
                <Link to="/ai" className={`pages ${isActive('/ai') ? 'active' : ''}`}>Ai</Link>
            </div>
            <div className="sections-logo">
                <Link to="/" className="logo-link">
                    <p>shatably</p>
                </Link>
            </div>
            <div className="sections-icons">
                <div className="search-container">
                    <input type="search" className="search-bar" placeholder='Search'/>
                    <img src={searchicon} className="search-icon" alt="search" />
                </div>
                <div className="icon-section">
                    {isLoggedIn ? (
                        <div className="relative ml-3">
                            <div className="flex items-center gap-4">
                                <img src={card} className="icon" alt="cart" />
                                <img src={vector} className="icon" alt="notification" />
                                <Link to="/User">
                                    <img 
                                        src={user} 
                                        className={`icon ${isActive('/User') ? 'active' : ''}`} 
                                        alt="user" 
                                    />
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-[#16404D] hover:opacity-80 text-sm font-medium"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <button className="bg-[#16404D] loginBtn " onClick={() => navigate('/login')}>
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