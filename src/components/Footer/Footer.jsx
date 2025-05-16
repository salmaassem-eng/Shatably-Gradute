import React from "react";
import "./footer.css";
import FooterColumn from "./Column";
import logo from "../../assets/react.svg";
import facebook from "../../assets/Facebook.svg";
import pinterest from "../../assets/pinterest.svg";
import linkedin from "../../assets/linkedin.svg";
import phoneIcon from "../../assets/phone.svg";

const Footer = () => {
  const socialLinks = [
    { icon: facebook, name: "Facebook", label: "Visit our Facebook page" },
    { icon: pinterest, name: "Pinterest", label: "Visit our Pinterest page" },
    { icon: linkedin, name: "LinkedIn", label: "Visit our LinkedIn page" }
  ];

  const footerColumns = [
    {
      title: "Services",
      items: ["Carpenter", "Electrician", "Painter"],
      extraItems: [
        { text: "Plumber", link: "#" },
        { text: "Maid", link: "#" }
      ]
    },
    {
      title: "About Us",
      items: ["About Us", "Team", "Career"]
    },
    {
      title: "Quick Links", 
      items: ["Workers", "Reviews", "Reach Us"],
      extraItems: [
        { text: "Privacy Policy", link: "#" }
      ]
    }
  ];

  return (
    <>
      {/* <div className="wave-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="100 -160 1340 320">
          <path
            fill="#fff"
            className="wave-svg"
            fill-opacity="1"
            d="M0,92L60,65.3C120,39,240,-15,360,-20C480,-25,600,17,720,38.7C840,60,960,60,1080,44C1200,28,1320,-4,1380,-20L1440,-36L1440,220L1380,220C1320,220,1200,220,1080,220C960,220,840,220,720,220C600,220,480,220,360,220C240,220,120,220,60,220L0,220Z"
          ></path>
        </svg>
      </div> */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-col logo-section">
            <img src={logo} alt="Logo" className="footer-logo" />
            <div>
              <h4>SHATABLY</h4>
              <p className="Text-opacity">
                A team of skilled professionals offering high-quality finishing
                services for apartments and homes.
              </p>
              <div className="contact-info">
                <p className="phone">
                  <img src={phoneIcon} alt="Phone" className="phone-icon" />
                  <span>+02 0123456789</span>
                </p>
                <div className="contact-buttons">
                  <a href="#contact" className="contact-btn-footer">Contact us</a>
                  <a href="#visit" className="visit-btn-footer">Visit us</a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Columns  */}
          <div className="FooterCol-grid">
            {footerColumns.map((column, index) => (
              <FooterColumn
                key={index}
                Title={column.title}
                item1={column.items[0]}
                item2={column.items[1]}
                item3={column.items[2]}
              >
                {column.extraItems?.map((item, idx) => (
                  <li key={idx}>
                    <a href={item.link}>{item.text}</a>
                  </li>
                ))}
              </FooterColumn>
            ))}
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="social-icons">
            {socialLinks.map((social, index) => (
              <a key={index} href="#" aria-label={social.label}>
                <img src={social.icon} alt={social.name} className="social-icon" />
              </a>
            ))}
          </div>

          <small className="Text-opacity">© Shatably Team</small>
          <small className="Text-opacity">All rights reserved 2025</small>
        </div>
      </footer>
    </>
  );
};

export default Footer;
