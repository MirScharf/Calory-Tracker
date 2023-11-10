import React from "react";
import { Link } from "react-router-dom";
import './Home.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }

      const { data } = await axios.post(
        "http://localhost:5555",
        {},
        { withCredentials: true }
      );

      const { status, user } = data;
      setUsername(user);
      return status
        ? toast.info(`Hello ${user}`,
        {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          toastId: 'success1',  // Message appears twice if not declared...
        })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/login");
  };
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
    <p>Welcome <span>{username}!</span></p>
    <div><Link to="/recipyHub">Visit the Recipy Hub!</Link></div>
    <div id="landingPageText">Track Your Way to a Healthier You! With the Caloric Intake Tracker, 
         managing your daily caloric intake is as easy as a few taps. 
         Stay on top of your health goals, one meal at a time. 
         Join today and make every calorie count!</div>
    <div className="links">
      <div><Link to="/login">Login</Link></div>
      <div><Link to="/register">Register</Link></div>
    </div>
    <button onClick={Logout}>Logout</button>
  </div>
);
};

export default Home;