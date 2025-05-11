import React from "react";
import "./footer.css";
import FooterColumn from "./Column";
import logo from "../../assets/react.svg";
import facebook from "../../assets/Facebook.svg";
import pintrest from "../../assets/pinterest.svg";
import linkedin from "../../assets/linkedin.svg";

function Footer() {
  return (
    <>
      {/* <div className="wave-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="100 -235 1340 300">
          <path
            fill="#f0ff"
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
            </div>
          </div>

          {/* Footer Columns  */}
          <div className="FooterCol-grid">
            <FooterColumn
              Title={"Services"}
              item1={"Carpenter"}
              item2={"Electrician"}
              item3={"Painter"}
            >
              <li>
                <a href="#">Plumber</a>
              </li>
              <li>
                <a href="#">Maid</a>
              </li>
            </FooterColumn>
            <FooterColumn
              Title={"About Us"}
              item1={"About Us"}
              item2={"Team"}
              item3={"Career"}
            />
            <FooterColumn
              Title={"Quick Links"}
              item1={"Workers"}
              item2={"Reviews"}
              item3={"Reach Us"}
            >
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </FooterColumn>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="social-icons">
            <img src={facebook} alt="facebook" />
            <img src={pintrest} alt="pintrest" />
            <img src={linkedin} alt="linkedin" />
          </div>

          <small className="Text-opacity">© Shatably Team</small>
          <small className="Text-opacity">All rights reserved 2025</small>
        </div>
      </footer>
    </>
  );
}

export default Footer;
