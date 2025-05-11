import './navbar.css';
import searchicon from '../../assets/search-normal.svg';
import card from '../../assets/cart.svg';
import user from '../../assets/user.svg';
import vector from '../../assets/Vector.svg';

export default function Navbar() {
    return (
        <>
            <nav className='nav'>
                <div className="sections">
                    <button className="pages">home</button>
                    <button className="pages">services</button>
                    <button className="pages">community</button>
                    <button className="pages">Ai</button>
                </div>
                <div className="sections">
                    <p>shatably</p>
                </div>
                <div className="sections">
                    <div class="search-container">
                        <input type="search" className="search-bar" />
                        <img src={searchicon} className='search-icon' />
                    </div>
                    <div className="icon-section">
                        <img src={user} className='icon'/>
                        <img src={card} className='icon'/>
                        <img src={vector} className='icon'/>
                    </div>
                </div>
            </nav>
        </>
    )
}