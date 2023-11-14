import React from "react";
import { Link } from "react-router-dom";
import '../styles/Home.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import Navibar from "../components/NavbarComp";

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

  const [inputValue, setInputValue] = useState({caloryGoal: ""});
      const { caloryGoal } = inputValue;
      const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
          ...inputValue,
          [name]: value,
        });
    };

  const submitCalories = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:5555/user/postCaloryGoal',
        data: {
          username: username,
          caloryGoal: caloryGoal,
        }})
        if (response.status === 201){
          toast.success(`Your desired Caloric intake is now set as ${caloryGoal}`)
        }
        } catch (error) {
          console.log(error)}
  }

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
    <Navibar user={username} />

    <p>Welcome <span>{username}!</span></p>
    <div><Link to="/recipyHub">Visit the Recipy Hub!</Link></div>
    <div id="landingPageText">Track Your Way to a Healthier You! With the Caloric Intake Tracker, 
         managing your daily caloric intake is as easy as a few taps. 
         Stay on top of your health goals, one meal at a time. 
         Join today and make every calorie count!</div>
    <div id="inputFieldText">
      <label>Set yourself a goal for your daily caloric intake:
          <input id="caloryGoal" name="caloryGoal" value={caloryGoal} type="text" 
          placeholder="1800 for example" 
          onChange={handleOnChange} />
      </label>
    </div>
    <div><button onClick={submitCalories}>Submit</button></div>
    <div className="links">
      <div><Link to="/login">Login</Link></div>
      <div><Link to="/register">Register</Link></div>
    </div>
    <button onClick={Logout}>Logout</button>
  </div>
);
};

export default Home;