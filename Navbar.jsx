import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function Navbar() {
  return (
    <nav className="navbar">
      <img src="/logo.png" alt="Logo" className="logo" />
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/login">Login</Link>
        <Link to="/pitch">AI Pitch</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/match">NeuroMatch</Link>
      </div>
    </nav>
  );
}

export default Navbar;


