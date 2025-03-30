import axios from "axios";
import { useState } from "react";

import './styles/ContactForm.css';

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://portfolie-mern.onrender.com/messages", form)
      .then(() => alert("Message sent!"))
      .catch(() => alert("Error sending message"));
  };

  return (
    <div className="contact-form-container">
     
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          value={form.name} 
          onChange={(e) => setForm({ ...form, name: e.target.value })} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={form.email} 
          onChange={(e) => setForm({ ...form, email: e.target.value })} 
          required 
        />
        <textarea 
          placeholder="Message" 
          value={form.message} 
          onChange={(e) => setForm({ ...form, message: e.target.value })} 
          required 
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ContactForm;
