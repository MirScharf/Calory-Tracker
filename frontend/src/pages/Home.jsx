import React from "react";
import { Link } from "react-router-dom";

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
    <div className="links">
      <div><Link to="/login">Login</Link></div>
      <div><Link to="/register">Register</Link></div>
    </div>
  </div>
);
};

export default Home