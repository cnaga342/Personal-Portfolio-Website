import { Link } from "react-router-dom";
import "./styles/Navbar.css"; // Import the CSS file

const Navbar = () => (
  <nav className="navbar">
    <div className="logo">Nagabhushanam</div>
    <div className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/about">About Me</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/admin" className="admin-link">Admin</Link>
    </div>
  </nav>
);

export default Navbar;
