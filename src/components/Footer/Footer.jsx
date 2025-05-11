import React from "react";
import "./footer.css";
import FooterColumn from "./Column";
import logo from "../../assets/react.svg";
import facebook from "../../assets/Facebook.svg"
import pintrest from "../../assets/pinterest.svg"
import linkedin from "../../assets/linkedin.svg"

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col logo-section">
          <img src={logo} alt="Logo" className="footer-logo" />
          <div >
          <h4>SHATABLY</h4>
          <p className="Text-opacity">
            A team of skilled professionals offering high-quality 
            finishing services for apartments and homes.
          </p>
          </div>
        </div>

        {/* Footer Columns  */}
        <div className="FooterCol-grid">
        <FooterColumn Title={"Services"} item1={"Carpenter"} item2={"Electrician"} item3={"Painter"} >
            <li>
              <a href="#">Plumber</a>
            </li>
            <li>
              <a href="#">Maid</a>
            </li>
        </FooterColumn>
        <FooterColumn Title={"About Us"} item1={"About Us"} item2={"Team"} item3={"Career"}/>
        <FooterColumn Title={"Quick Links"} item1={"Workers"} item2={"Reviews"} item3={"Reach Us"}>
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
  );
}

export default Footer;
