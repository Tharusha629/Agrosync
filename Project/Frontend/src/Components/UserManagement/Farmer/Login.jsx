// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./acc.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8085/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Login successful");
        localStorage.setItem("UserID", data.user._id);
        window.location.href = "/home";
      } else {
        alert(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login");
    }
  };
  return (
    <div className="bk_test">
      <div className="auth_from">
        <div className="auth_from_colum"></div>
        <form className="auth_from_in" onSubmit={handleLogin}>
          <p className="auth_topic">Welcome Back</p>
          <p className="auth_topic_sub">Enter Your Details And Login Here.</p>
          <div>
            <label className="data_from_lable">Email</label>
            <input
              className="data_from_input"
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="data_from_lable">Password</label>
            <input
              className="data_from_input"
              type="password"
              id="password"
              placeholder="Enter Your Password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="from_btn">Sign In</button>
          <p className="noacc">
            if your don't have account{" "}
            <span
              className="noacc_link"
              onClick={() => (window.location.href = "/register")}
            >
              Register
            </span>
            
          </p>
          <p className="noacc">
            Log in as Admin{" "}
            <span
              className="noacc_link"
              onClick={() => (window.location.href = "/adminLogin")}
            >
              Log in
            </span>
            
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
