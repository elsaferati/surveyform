import React, { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8008/surveyform/src/controllers/forgot_password.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setMessage("Kontrollo email-in për instruksionet e resetimit të fjalëkalimit.");
      } else {
        setMessage(data.error || "Ndodhi një gabim.");
      }
    })
    .catch(err => {
      console.error(err);
      setMessage("Gabim gjatë lidhjes me serverin.");
    });
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Shkruaj emailin"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Dergo Linkun për Resetim</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPasswordPage;
