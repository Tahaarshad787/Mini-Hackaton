import React from "react";
import "../LandingPage/Styles/About.css";
import StaysHotel from '../../assets/Images/stays hotel.jpg'


const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-text">
          <h2 className="about-title">About Luxury Stays</h2>
          <p className="about-description">
            Luxury Stays offers an unparalleled hospitality experience with world-class services,
            elegant interiors, and an ambiance of ultimate comfort. Whether you're here for business
            or leisure, our hotels are designed to make your stay unforgettable.
          </p>
          <p className="about-highlight">
            Experience the perfect blend of sophistication and relaxation.
          </p>
        </div>
        <div className="about-image">
          <img src={StaysHotel} alt="Luxury Stays" className="about-img" />
        </div>
      </div>
    </section>
  );
};

export default About;
