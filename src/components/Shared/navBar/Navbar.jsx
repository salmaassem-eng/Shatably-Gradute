import './navbar.css';
import { useState } from 'react';
import searchicon from '../../../assets/search-normal.svg';
import card from '../../../assets/cart.svg';
import user from '../../../assets/user.svg';
import vector from '../../../assets/Vector.svg';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="nav">
            <div className="side-nav" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>

            <div className={`sections-pages ${isMenuOpen ? 'active' : ''}`}>
                <button className="pages">home</button>
                <button className="pages">services</button>
                <button className="pages">community</button>
                <button className="pages">Ai</button>
            </div>
            <div className="sections-logo">
                <p>shatably</p>
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