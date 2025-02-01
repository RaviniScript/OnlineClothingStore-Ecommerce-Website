import React from "react";
import Header from "./Header";
import "./LandingPage.css";
import landing from "../assets/Landing2.jpg";


const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <div className="hero-section">
        <div className="text-content">
          <h1 className="text">Dress Collection</h1>
          
          <button className="shop-btn">Shop the Collection</button>
        </div>
        <div className="image-content">
          <img src={landing} alt="landing" className="hero-image" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
