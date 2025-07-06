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
  const [loading, setLoading] = useState(false);

  // Password must contain letters and numbers, minimum 6 chars
  const isStrongPassword = (pass) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(pass);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    if (password !== confirmPassword) {
      setErrorMessage("❌ Passwords do not match.");
      setLoading(false);
      return;
    }

    if (!isStrongPassword(password)) {
      setErrorMessage(
        "❌ Password must be at least 6 characters long and contain letters and numbers."
      );
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8008/surveyform/src/models/register.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, confirmPassword }),
        }
      );

      const data = await response.json();
      console.log("📦 Server response:", data);

      if (data.error) {
        setErrorMessage("❌ " + data.error);
      } else if (data.success) {
        setSuccessMessage("✅ " + data.success);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        setErrorMessage("❌ Unexpected server response.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setErrorMessage("❌ Could not connect to the server.");
    }
    setLoading(false);
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          id="name"
          placeholder="Full Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <p className="login-link">
        Already have an account? <Link to="/">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;




