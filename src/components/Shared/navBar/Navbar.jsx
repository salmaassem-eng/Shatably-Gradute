import './navbar.css';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import searchicon from '../../../assets/search-normal.svg';
import card from '../../../assets/cart.svg';
import user from '../../../assets/user.svg';
import vector from '../../../assets/Vector.svg';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isActive = (path) => {
        return location.pathname === path;
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
                    <input type="search" className="search-bar" />
                    <img src={searchicon} className="search-icon" alt="search" />
                </div>
                <div className="icon-section">
                    <img src={user} className="icon" alt="user" />
                    <img src={card} className="icon" alt="cart" />
                    <img src={vector} className="icon" alt="notification" />
                </div>
            </div>
        </nav>
    );
}