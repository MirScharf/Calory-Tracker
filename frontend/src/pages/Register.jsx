import React from "react";

const Register = () => {
  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "10vh",
    flexDirection: "column",
  };
  return (
    <div style={styles}>
    <h3>Register on your Account</h3>
    <div className="login-form">
      <form>
        <div className="form-group">
          <div><label htmlFor="username">Username:</label></div>
          <input type="text" id="username" name="username" />
        </div>
        <div className="form-group">
          <div><label htmlFor="password">Password:</label></div>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  </div>
  )
};

export default Register