import React, { useState } from "react";
import "../styles/LoginPage.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('http://localhost:8008/surveyform/backend/login.php', {
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
        // Mund të ruash user-in në localStorage ose të bësh redirect
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/survey"; // ose "/dashboard" varësisht nga struktura jote
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
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      <p className="register-link">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
