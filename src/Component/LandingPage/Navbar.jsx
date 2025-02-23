import React from "react";
import "../LandingPage/Styles/Navbar.css";
import { User } from "lucide-react";
import LogoImage from '../../assets/Images/logo pic.webp'
import { useNavigate } from "react-router-dom";

const Navbar = () => {

        const navigate = useNavigate() 
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={LogoImage} alt="Luxury Stays" className="logo" />
        <h2 className="brand">Luxury Stays</h2>
      </div>
      <div className="navbar-links">
        <a href="#" className="nav-link">Home</a>
        <a href="#" className="nav-link">About</a>
        <a href="#" className="nav-link">Rooms</a>
        <a href="#" className="nav-link">Contact</a>
      </div>
      <div className="navbar-buttons">
        <button className="signup-btn" onClick={() => navigate('/signup')}>Sign Up</button>
        <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
        {/* <User className="user-icon" /> */}
      </div>
    </nav>
  );
};

export default Navbar;