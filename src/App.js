import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import UserTable from "./components/UserTable";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/users" element={<UserTable />} />
      </Routes>
    </Router>
  );
};

export default App;
