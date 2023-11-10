import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


const Login = () => {
  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "10vh",
    flexDirection: "column",
  };
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });
  const { username, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
      autoClose: 1000,
      hideProgressBar: true,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5555/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      username: "",
      password: "",
    });
    
  };

  return (
  <div style={styles}>
    <h3>Login with your Account</h3>
    <div className="login-form">
      <form  onSubmit={handleSubmit}>
        <div className="form-group">
         <div><label htmlFor="username">Username:</label></div> 
          <input type="text" id="username" name="username" placeholder="Enter username" value={username} onChange={handleOnChange} />
        </div>
        <div className="form-group">
          <div><label htmlFor="password">Password:</label></div>
          <input type="password" id="password" name="password" placeholder="Enter password" value={password} onChange={handleOnChange} />
        </div>
        <button type="submit">Login</button>
         <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
      </form>
    </div>
  </div> 
  )
};

export default Login