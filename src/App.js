import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import UserTable from "./views/UserTable";
import SurveyForm from "./views/SurveyForm";
import ThankYou from "./views/Thankyou"; // Adjust path if needed

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/users" element={<UserTable />} />
        <Route path="/survey" element={<SurveyForm />} />       {/* ✅ Add this */}
        <Route path="/thank-you" element={<ThankYou />} />      {/* ✅ Add this */}
      </Routes>
    </Router>
  );
};

export default App;
