import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminAuth.css";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "123") {
      alert("Login successful!");
      navigate("/allFarmers"); // Redirect to dashboard
    } else {
      alert("Invalid username or password!");
    }
  };

  return (
    <div className="bk_test">
      <div className="auth_from">
        <div className="auth_from_colum_admin"></div>
        <form className="auth_from_in" onSubmit={handleLogin}>
          <p className="auth_topic">Welcome Back Admin</p>
          <p className="auth_topic_sub">Enter Your Details And Login Here.</p>
          <div>
            <label className="data_from_lable">User name:</label>
            <input
              className="data_from_input"
              type="text"
              placeholder="Enter Your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="data_from_lable">Password:</label>
            <input
              className="data_from_input"
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="from_btn">Login</button>
          <p className="noacc">
            Log in as Farmer{" "}
            <span
              className="noacc_link"
              onClick={() => (window.location.href = "/")}
            >
              Log in
            </span>
            
          </p>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
