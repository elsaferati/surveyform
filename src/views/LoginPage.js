import React, { useState } from "react";
import "../styles/LoginPage.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    fetch("http://localhost:8008/surveyform/src/models/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.success) {
          alert("Login i suksesshëm!");

          const user = data.user;

          // Basic admin check
          if (user.email === "elsa@gmail.com") {
            user.isAdmin = true;
          } else {
            user.isAdmin = false;
          }

          localStorage.setItem("user", JSON.stringify(user));

          // Redirect to dashboard or home page
          window.location.href = "/survey";
        } else if (data.error) {
          setErrorMessage("Gabim: " + data.error);
        } else {
          setErrorMessage("Gabim i papritur.");
        }
      })
      .catch((err) => {
        console.error("Gabim gjatë kërkesës:", err);
        setErrorMessage("Gabim gjatë lidhjes me serverin.");
      })
      .finally(() => setLoading(false));
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
        <button type="submit" id="loginButton" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

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


