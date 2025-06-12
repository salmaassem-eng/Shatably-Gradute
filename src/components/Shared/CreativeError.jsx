import React from 'react';
import './CreativeError.css'; // Import the CSS for styling

const CreativeError = ({ message = "Something went wrong!" }) => {
  return (
    <div className="creative-error-container">
      <div className="oops-text">Oops!</div>
      <div className="character">👷‍♂️</div> 
      <p className="error-message">{message}</p>
      <p className="fix-it-text">Please try again later or <a href='/contact-us'>contact support</a>.</p>
    </div>
  );
};

export default CreativeError; 