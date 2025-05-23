import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.isAdmin) {
      setIsAdmin(true);
    }
  }, []);

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">Survey Form</h1>
        <nav className="space-x-4">
          <Link to="/survey" className="text-white hover:text-gray-300">Home</Link>
          {isAdmin && (
            <Link to="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
          )}
          <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
          <Link to="/register" className="text-white hover:text-gray-300">Register</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

