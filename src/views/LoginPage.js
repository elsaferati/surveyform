import React, { useState } from "react";
import "../styles/LoginPage.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('http://localhost:8008/surveyform/src/models/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    
      if (data.success) {
        alert("Login i suksesshëm!");

        const user = data.user;

        // 👇 Add admin check
        if (user.email === "elsa@gmail.com") {
          user.isAdmin = true;
        } else {
          user.isAdmin = false;
        }

        localStorage.setItem("user", JSON.stringify(user));

        // Optional: Redirect to dashboard if admin
        if (user.isAdmin) {
          window.location.href = "/survey";
        } else {
          window.location.href = "/survey";
        }

      } else if (data.error) {
        alert("Gabim: " + data.error);
      } else {
        alert("Gabim i papritur.");
      }
    })
    .catch(err => {
      console.error("Gabim gjatë kërkesës:", err);
      alert("Gabim gjatë lidhjes me serverin.");
    });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          id="email"            
          name="email" 
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"       
          name="password" 
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
       <button type="submit" id="loginButton">Login</button>
      </form>

      
<p className="forgot-password-link">
  <Link to="/forgot-password">Forgot Password?</Link>
</p>

      <p className="register-link">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginPage;

