import React from "react";

const Login = () => {
  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "10vh",
    flexDirection: "column",
  };
  return (
  <div style={styles}>
    <h3>Login with your Account</h3>
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
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
  )
};

export default Login