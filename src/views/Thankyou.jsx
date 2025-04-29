// src/views/Thankyou.jsx
import React from "react";
import '../styles/Thankyou.css';  // Import the CSS for styling

function Thankyou() {
  return (
    <div className="thankyou-container">
      <h1 className="thankyou-title">Thank you for completing the survey!</h1>
      <p className="thankyou-message">We appreciate your feedback. Your responses help us improve our services.</p>
    </div>
  );
}

export default Thankyou;
