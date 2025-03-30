import React from "react";
import resume from "../assets/resume.pdf";
import "./styles/About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About Me</h1>

      <section className="personal-info">
        <h2 style={{color:"green"}}>Personal Background</h2>
        <p style={{color:"white"}}>
          Hi, I'm <strong>Nagabhushanam</strong>, a passionate web developer with experience in 
          building modern and efficient web applications. I specialize in 
          <strong> JavaScript, React, and Next.js</strong>.
        </p>
      </section>

      <section className="education">
        <h2 style={{color:"green"}}>Education</h2>
        <ul>
          <li>
            <strong>Diploma in Mechanical Engineering</strong>  
            <span> - Dr. YC James Polytechnic College (2016 - 2019)</span>
          </li>
          <li>
            <strong>B.Tech in Computer Science & Engineering</strong>  
            <span> - GVIC (2022 - 2025)</span>
          </li>
        </ul>
      </section>

      <section className="resume-download">
       
        <a href={resume} download className="download-button">
           Resume (PDF)
        </a>
      </section>
    </div>
  );
};

export default About;
