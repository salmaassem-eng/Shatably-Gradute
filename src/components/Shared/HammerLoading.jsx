import React from 'react';
import './HammerLoading.css';

const HammerLoading = () => {
  return (
    <div className="loading-container">
      <div className="hammer-nail-loader">
        <div className="hammer">
          <div className="handle"></div>
          <div className="head">
            <div className="strike"></div>
            <div className="claw"></div>
          </div>
        </div>
        <div className="nail">
          <div className="head"></div>
          <div className="shaft"></div>
        </div>
      </div>
      <p className="loading-text">Wait a second...</p>
    </div>
  );
};

export default HammerLoading; 