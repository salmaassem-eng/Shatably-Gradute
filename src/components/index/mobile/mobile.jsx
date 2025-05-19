import React from 'react';
import mobile from '../../../assets/mobilePage.svg';
import onDemand from '../../../assets/On-demand.svg';
import serviceTracking from '../../../assets/orderTracking.svg';
import taskScheduling from '../../../assets/TaskSchedualing.svg';
import './mobile.css';

const Mobile = () => {
  return (
    <section className="mobile-section">
      <div className="mobile-grid">
        {/* Left Content */}
        <div className="about-content">
          <h2>About us</h2>
          <p>
          We connect users with trusted finishing service providers.  
         SHATABLY helps you find skilled professionals near you,
           making it simple to book reliable help for your home or office projects.
          </p>
          <button className="contact-btn">Contact us</button>
        </div>

        {/* Center Mobile Image */}
        <div className="mobile-image-container">
          <div className="mobile-frame">
            <img src={mobile} alt="Mobile app interface" className="mobile-screenshot" />
          </div>
        </div>

        {/* Right Features */}
        <div className="features-list">
          <div className="feature-item">
            <div className="feature-icon">
              <img src={onDemand} alt="on-demand services" className="icon1" />
            </div>
            <div className="feature-text">
              <h3>On-demand handyman services</h3>
              <p>Book skilled professionals at your convenience</p>
            </div>
          </div>

          <div className="feature-item">
              <div className="feature-icon">
              <img src={serviceTracking} alt="service tracking" className="icon2" />
            </div>
            <div className="feature-text">
              <h3>Service tracking and history</h3>
              <p>Monitor ongoing services and view past bookings</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <img src={taskScheduling} alt="task scheduling" className="icon3" />
            </div>
            <div className="feature-text">
              <h3>Task scheduling and reminders</h3>
              <p>Set appointments and get timely notifications</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mobile;
