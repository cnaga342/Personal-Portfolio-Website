import React, { useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

import ContactForm from "../components/ContactForm";
import "./styles/Contact.css";


const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent by ${formData.name} (${formData.email})`);
    // Here, you can integrate an email service like EmailJS or backend API
  };

  return (
    <section id="contact" className="contact">
      <h2>Contact Me</h2>

      {/* Social Links */}
      <div className="social-links">
        <a href="https://github.com/cnaga342" target="_blank" rel="noopener noreferrer">
          <FaGithub size={40} className="icon github" />
        </a>
        <a href="https://www.linkedin.com/in/cnaga342/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={40} className="icon linkedin" />
        </a>
        <a href="mailto:cnaga342@gmail.com">
          <FaEnvelope size={40} className="icon email" />
        </a>
      </div>
      <ContactForm/>
      
    </section>
  );
};

export default Contact;
