import React, { useEffect, useState } from "react";
import "../styles/UserTable.css";

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8008/surveyform/api/users.php")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Fetch users failed:", err));
  }, []);

  return (
    <div className="user-table">
      <h2>Registered Users</h2>
      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserTable;
