import React from "react";
import "./footer.css";
import FooterColumn from "./Column";
import logo from "../../../assets/react.svg";
import facebook from "../../../assets/Facebook.svg";
import pinterest from "../../../assets/pinterest.svg";
import linkedin from "../../../assets/linkedin.svg";
import phoneIcon from "../../../assets/phone.svg";

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
    <footer className="bg-white w-full pt-4 pb-2 bottom-0">
      <div className="max-w-[1500px] grid grid-cols-2 gap-20 px-8 py-[2rem] md:grid-cols-2 sm:grid-cols-1 footer-container">
        {/* Logo Section */}
        <div className="grid grid-cols-[50px_250px] gap-[5rem] max-w-[500px] mx-auto items-start md:grid-cols-1 sm:grid-cols-1 logo-section">
          <img src={logo} alt="Logo" className="w-[110px]" />
          <div className="flex flex-col gap-[10px]">
            <h4 className="font-bold">SHATABLY</h4>
            <p className="opacity-60">
              A team of skilled professionals offering high-quality finishing
              services for apartments and homes.
            </p>

            <div className="flex flex-col gap-[20px] mt-[10px] mb-[10px] items-start sm:items-center contact-info">
              <p className="flex items-center gap-[5px] phone">
                <img src={phoneIcon} alt="Phone" className="w-[20px] h-[20px]" />
                <span className="font-medium weight-550">+02 0123456789</span>
              </p>
              <div className="flex gap-[10px] sm:flex-col sm:items-center contact-buttons">
                <a
                  href="#contact"
                  className="bg-[#16404D] text-[#fff] text-decoration-none font-semibold text-[0.9rem] py-[10px] px-[20px] rounded-[5px] hover:-translate-y-[5px] hover:text-[#fff] transition duration-300 ease-in-out contact-btn-footer"
                >
                  Contact us
                </a>
                <a
                  href="#visit"
                  className="border border-[#16404D] text-[#16404D] text-decoration-none font-semibold text-[0.9rem] py-[10px] px-[20px] rounded-[5px] hover:-translate-y-[5px] hover:text-[#16404D] hover:bg-white transition duration-300 ease-in-out visit-btn-footer"
                >
                  Visit us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-3 gap-16 text-sm justify-around text-[#333] FooterCol-grid">
          {footerColumns.map((column, index) => (
            <FooterColumn
              key={index}
              Title={column.title}
              item1={column.items[0]}
              item2={column.items[1]}
              item3={column.items[2]}
            >
              {column.extraItems?.map((item, idx) => (
                <li className="mb-[0.5rem] opacity-60" key={idx}>
                  <a className="text-decoration-none text-[#333] text-[0.9rem] hover:text-[#000]" href={item.link}>
                    {item.text}
                  </a>
                </li>
              ))}
            </FooterColumn>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex flex-col justify-center items-center border-t-[1px] border-solid border-[#ccc] pt-[1rem] text-center">
        <div className="flex gap-[0.5rem] mb-[0.5rem] text-[1.2rem] justify-center flex-wrap">
          {socialLinks.map((social, index) => (
            <a key={index} href="#" aria-label={social.label}>
              <img
                src={social.icon}
                alt={social.name}
                className="w-[20px] h-[20px] hover:opacity-80 transition duration-300 ease-in-out"
              />
            </a>
          ))}
        </div>
        <small className="opacity-60">© Shatably Team</small>
        <small className="opacity-60">All rights reserved 2025</small>
      </div>
    </footer>
  );
};

export default Footer;
