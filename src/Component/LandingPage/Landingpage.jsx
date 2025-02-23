import React from "react";
import Navbar from "../LandingPage/Navbar";
import Footer from "../LandingPage/Footer";
import About from "../LandingPage/About";
import "./styles/landingPage.css";
import HotelImage from '../../assets/Images/hotel lux.jpg'
import RoomImage from '../../assets/Images/cozy room.jpg'



const LandingPage = () => {

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <section className="hero-section">
        <h1 className="hero-title">Welcome to Luxury Stays</h1>
        <p className="hero-text">
          Experience world-class hospitality and comfort at our premium hotels. Book your stay today!
        </p>
        <button className="hero-button">Book Now</button>
      </section>

      <section className="image-section">
        <div className="image-container">
          <img src={HotelImage} alt="Luxury Hotel" className="image" />
          <div className="image-overlay">
            <p className="image-text">Enjoy a luxurious stay with world-class facilities.</p>
          </div>
        </div>
        <div className="image-container">
          <img src={RoomImage} alt="Cozy Rooms" className="image" />
          <div className="image-overlay">
            <p className="image-text">Relax in our comfortable and cozy rooms.</p>
          </div>
        </div>
      </section>
      <About />

      <Footer />
    </div>
  );
};

export default LandingPage;

