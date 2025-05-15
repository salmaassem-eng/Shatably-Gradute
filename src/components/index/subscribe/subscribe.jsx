import React, { useState } from 'react';
import './subscribe.css';
import arrow from '../../../assets/Arrow.svg';

function Subscribe() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            // Handle subscription logic here
            console.log('Subscribing:', email);
            setEmail('');
        }
    };

    return (
        <div className="subscribe-container">
            <div className="subscribe-content">
                <div className="subscribe-text">
                    <div className="heading-with-lines">
                        <div className="burst-lines">
                            <span></span>
                            <span className='line-2'></span>
                            <span></span>
                        </div>
                        <h2>Unlock Exclusive Deals !</h2>
                    </div>
                    <p>Want exclusive deals and special offers sent straight to your inbox?<br />
                        Subscribe now and never miss out on great opportunities!</p>
                </div>
                <div className='subscribe-form-container'>
                <form className="subscribe-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter your email ..."
                        className="email-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className="subscribe-button">
                        SUBSCRIBE
                    </button>
                </form>
                <img src={arrow} alt="" className="subscribe-arrow" aria-hidden="true" />
            </div>
            </div>
        </div>
    );
}

export default Subscribe;
