import React, { useEffect, useState } from "react";
import "../styles/UserTable.css";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({ name: "", email: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch("http://localhost:8008/surveyform/api/users.php")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Fetch users failed:", err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8008/surveyform/api/delete_user.php?id=${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => fetchUsers())
      .catch((err) => console.error("Delete failed:", err));
  };

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setEditedUser({ name: user.name, email: user.email });
  };

  const handleUpdate = (id) => {
    fetch(`http://localhost:8008/surveyform/api/update_user.php`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...editedUser }),
    })
      .then((res) => res.json())
      .then(() => {
        fetchUsers();
        setEditingUserId(null);
      })
      .catch((err) => console.error("Update failed:", err));
  };

  return (
    <div className="user-table">
      <h2>Registered Users</h2>
      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  {editingUserId === user.id ? (
                    <input
                      value={editedUser.name}
                      onChange={(e) =>
                        setEditedUser({ ...editedUser, name: e.target.value })
                      }
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editingUserId === user.id ? (
                    <input
                      value={editedUser.email}
                      onChange={(e) =>
                        setEditedUser({ ...editedUser, email: e.target.value })
                      }
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>{user.created_at}</td>
                <td>
                  {editingUserId === user.id ? (
                    <button onClick={() => handleUpdate(user.id)}>Save</button>
                  ) : (
                    <button onClick={() => handleEditClick(user)}>Edit</button>
                  )}
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
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


