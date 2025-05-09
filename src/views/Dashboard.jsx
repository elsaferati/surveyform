import React, { useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import Header from "../components/Header";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/survey"); // block access
    }
  }, []);

  return (
    <>
      <Header />
      <div className="flex h-[calc(100vh-64px)]"> {/* Adjust height if header is 64px */}
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white p-6">
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
          <nav className="space-y-4">
            <Link to="/users" className="block hover:text-gray-300">
              Users
            </Link>
            <Link to="/survey-results" className="block hover:text-gray-300">
              Survey Results
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Dashboard;


