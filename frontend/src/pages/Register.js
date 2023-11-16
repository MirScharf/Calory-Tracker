import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // For HTTP-Requests
import { toast } from "react-toastify"; // For notifications
import '../styles/Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    username: "",
    password: ""
  })
  const { username, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    })
  }
  const handleError = (err) =>
    toast.error(err, {
    position: "bottom-left",
  });
  const handleSuccess = (msg) =>
    toast.success(msg, {
    position: "bottom-right",
  });

  const handleSubmit = async (e) => {   // Sends a Post-Request to localhost:5555 with inputValues
  e.preventDefault();
  try {
    const { data } = await axios.post(
      "http://localhost:5555/register",
      {
        ...inputValue,
      },
      { withCredentials: true }
    );
    const { success, message } = data;
    if (success) {
      handleSuccess(message);
      setTimeout(() => {
        navigate("/");
      }, 1000);
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

  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "10vh",
    flexDirection: "column",
  };
  return (
    <div style={styles} id="loginForm">
    <h3>Create an Account</h3>
    <div className="login_form">
      <form onSubmit={handleSubmit}>
        <div className="form_group">
          <div><label htmlFor="username">Username:</label></div>
          <input type="text" id="username" name="username" value={username} onChange={handleOnChange} />
        </div>
        <div className="form-group">
          <div><label htmlFor="password">Password:</label></div>
          <input type="password" id="password" name="password" value={password} onChange={handleOnChange} />
        </div>
        <button type="submit">Register</button>
          <p>Already have an account? <Link to={"/login"}>Login</Link></p>
      </form>
    </div>
  </div>
  )
};

export default Register;