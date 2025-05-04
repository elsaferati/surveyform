import React, { useState } from "react";
import "../styles/LoginPage.css";
import { Link } from "react-router-dom"; // if you're using react-router

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with", email, password);
  };

  fetch('http://localhost/surveyform/login.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      username: 'emri_perdoruesit',
      password: 'fjalekalimi'
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Përdoruesi u autentikua me sukses
    } else {
      // Shfaq mesazhin e gabimit
      console.error(data.message);
    }
  });
  

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


