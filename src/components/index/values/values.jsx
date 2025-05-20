import React from "react";
import "./values.css";
import professional from "../../../assets/Manager.svg";
import trust from "../../../assets/Trust.svg";
import integrity from "../../../assets/Integrity.svg";
import service from "../../../assets/Service.svg";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";

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

  const sectionRef = useIntersectionObserver(); // for animation

  return (
    <section className="py-6 px-5 component-fadein" ref={sectionRef}>
      <div className="max-w-[1200px] mx-auto text-center">
        <h2 className="text-[1.9rem] mb-[1rem] ">Our Values</h2>
        <p className="opacity-70 mb-[3rem] max-w-[600px] mx-auto text-[1rem]">
          Our values shape the foundation of SHATABLY, guiding how we serve our clients and build trust.
        </p>
        <div className="grid grid-cols-2 gap-[3rem] p-[20px] md:grid-cols-1 values-grid">
          {coreValues.map((value, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center bg-[#A6CDC67D] p-[2rem] rounded-[25px] shadow-md transition-transform duration-300 hover:-translate-y-[5px] "
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
              <img 
                src={value.icon} 
                alt={value.title} 
                className="w-[62px] h-[62px] inline-block relative -top-[55px] mb-[-40px] rounded-full"
              />
              <h3 className="text-[1.5rem] mb-[1rem] opacity-90">{value.title}</h3>
              <p className="opacity-70 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
