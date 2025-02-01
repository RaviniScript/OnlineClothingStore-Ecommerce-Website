
import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./Header.css";


const Header = () => {
  
  const navigate = useNavigate();
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <img src="/logo.png" alt="" className="logo" />
        <h1 className="brand-name">Glamora</h1>
      </div>

      <nav className="nav-links">
      
        <NavLink to="/Dresses" className="nav-item">Dress</NavLink>
        <NavLink to="/Skirts" className="nav-item">Skirt</NavLink>
        <NavLink to="/Shirts" className="nav-item">Shirt</NavLink>
        <NavLink to="/Pants" className="nav-item">Pant</NavLink>
        <NavLink to="/Denims" className="nav-item">Denim</NavLink>
        <NavLink to="/Blouses" className="nav-item">Blouse</NavLink>
        
       
      </nav>

      <div className="icon-container">
      <i className="fa fa-user icon" onClick={() => navigate("/user")}></i>
       
  
      </div>
    </header>
  );
};

export default Header;
