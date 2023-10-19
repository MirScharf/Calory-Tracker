import React from "react";
import { Link } from "react-router-dom";
import './Home.css';
const Home = () => {
  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "5vh",
    flexDirection: "column",
  };
  return (
    <div style={styles}>
    <h3>Home Page</h3>
    <div id="landingPageText">Track Your Way to a Healthier You! With the Caloric Intake Tracker, 
         managing your daily caloric intake is as easy as a few taps. 
         Stay on top of your health goals, one meal at a time. 
         Join today and make every calorie count!</div>
    <div className="links">
      <div><Link to="/login">Login</Link></div>
      <div><Link to="/register">Register</Link></div>
    </div>
  </div>
);
};

export default Home