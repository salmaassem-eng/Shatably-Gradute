import React from "react";
import "./about.css";
import professional from "../../../assets/Manager.svg";
import trust from "../../../assets/Trust.svg";
import integrity from "../../../assets/Integrity.svg";
import service from "../../../assets/Service.svg";

function About() {
  const coreValues = [
    {
      icon: service,
      title: "Services",
      description: "SHATABLY offers a range of professional finishing services including painting, carpentry, electricity, and plumbing ."
    },
    {
      icon: professional,
      title: "Professionalism",
      description: "We deliver every service with respect, skill, and attention to detail—always on time, always courteous."
    },
    {
      icon: trust,
      title: "Trust",
      description: "We believe in building strong, long-term relationships with our clients by consistently delivering dependable and honest service."
    },
    {
      icon: integrity,
      title: "Integrity",
      description: "Every task we take on is guided by fairness, responsibility, and a strong commitment to quality, ensuring our clients' confidence and satisfaction."
    }
  ];

  return (
    <section className="about-section">
      <div className="about-container">
        <h2>Our Values</h2>
        <p className="subtitle">Our values shape the foundation of SHATABLY, guiding how we serve our clients and build trust.</p>
        <div className="values-grid">
          {coreValues.map((value, index) => (
            <div key={index} className="value-card">
              <img src={value.icon} alt={value.title} className="value-icon" />
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
