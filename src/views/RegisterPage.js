import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/RegisterPage.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isStrongPassword = (pass) => {
    // Minimum 6 characters, at least one letter and one number
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(pass);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("❌ Passwords do not match.");
      return;
    }

    if (!isStrongPassword(password)) {
      setErrorMessage(
        "❌ Password must be at least 6 characters long and contain letters and numbers."
      );
      return;
    }

    // Simulate successful registration
    setSuccessMessage("✅ Successfully registered!");
    console.log("Registering:", name, email, password);
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>

      {/* Display messages */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <p className="login-link">
        Already have an account? <Link to="/">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;


