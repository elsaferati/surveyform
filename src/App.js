// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import UserTable from "./views/UserTable";
import SurveyForm from "./views/SurveyForm";
import ThankYou from "./views/Thankyou"; // Adjust path if needed
import UsersPage from "./views/UsersPage";
import SurveyResults from "./views/SurveyResults"; 
import Dashboard from "./views/Dashboard";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect / to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Regular routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/users" element={<UserTable />} />
        <Route path="/survey" element={<SurveyForm />} />       {/* ✅ Add this */}
        <Route path="/thank-you" element={<ThankYou />} />      {/* ✅ Add this */}
        <Route path="/user" element={<UsersPage />} />
        <Route path="/survey-results" element={<SurveyResults />} />
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
