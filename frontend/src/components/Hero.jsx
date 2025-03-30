import profile from "../assets/profilepic.jpeg";
import "./styles/Hero.css"; // Import the CSS file

const Hero = () => (
  <div className="hero">
    <img src={profile} alt="Profile" className="profile-img" />
    <h1 className="hero-title">Hi, I'm Chinthakayala Nagabhushanam</h1>
    <p className="hero-subtitle">
    Enthusiastic Full Stack Developer with expertise in React, Next.js, Node.js, and Express.js, dedicated to building scalable and high-performance web applications. Proficient in MongoDB, PostgreSQL, and Firebase, with hands-on experience integrating RESTful APIs and cloud services. Strong in front-end development using Tailwind CSS, Chakra-UI, and Redux, ensuring responsive and dynamic user interfaces. Passionate about writing clean, maintainable code, optimizing performance, and crafting seamless user experiences.
    </p>
    
  </div>
);

export default Hero;
