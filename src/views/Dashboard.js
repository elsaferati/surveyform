import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (!user) {
      navigate('/login'); // nëse nuk është kyçur, ridrejtohet
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <h2>Mirësevjen, {localStorage.getItem('loggedInUser')}</h2>
      <button onClick={handleLogout}>Dil</button>
    </div>
  );
};

export default Dashboard;
