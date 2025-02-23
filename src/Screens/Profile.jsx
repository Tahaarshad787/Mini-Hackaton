import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import '../Screens/Peofile.css';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProfileImage from '../assets/Images/Profile img.png'


const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    } catch (error) {
      console.error("Error parsing userData from localStorage:", error);
      setUserData(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUserData(null);
    toast.success('👋 You’re logged out! See you again soon.', {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate('/');
  };

  return (
    <div className="profile-container">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="profile-card"
      >
        <div className="profile-gradient"></div>
        <div className="profile-image-container">
        <img src={ProfileImage} alt="Profile" className="profile-image rounded-full" />
        </div>
        {userData ? (
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="profile-info expanded"
          >
            <p className="profile-text"><strong>Name:</strong> {userData.name || "N/A"}</p>
            <p className="profile-text"><strong>Email:</strong> {userData.email || "N/A"}</p>
            <p className="profile-text"><strong>Role:</strong> {userData.role || "N/A"}</p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLogout}
              className="logout-button"
            >
              Logout
            </motion.button>
          </motion.div>
        ) : (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="loading-text"
          >
            Loading profile... (Make sure you're logged in)
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
