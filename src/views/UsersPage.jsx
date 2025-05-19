import React, { useEffect, useState } from "react";
import "../styles/UserTable.css"; // Optional: style file
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8008/surveyform/src/models/users.php")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const res = await fetch("http://localhost:8008/surveyform/src/controllers/delete_user.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (data.success) {
        alert("User deleted successfully!");
        setUsers(users.filter((user) => user.id !== id));
      } else {
        alert("Error deleting user: " + data.error);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="users-container">
      <h2>Registered Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Registered At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4">No users found.</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.created_at}</td>
                <td>
                  <button onClick={() => navigate(`/edit/${user.id}`)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)} style={{ marginLeft: "10px" }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
