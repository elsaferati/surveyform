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

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setEditedUser({ name: user.name, email: user.email });
  };

  const handleUpdate = () => {
    fetch(`http://localhost:8008/surveyform/api/update_user.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingUserId, ...editedUser }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchUsers();
          setEditingUserId(null);
        } else {
          alert(data.error || "Update failed");
        }
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    fetch(`http://localhost:8008/surveyform/api/delete_user.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchUsers();
        } else {
          alert(data.error || "Delete failed");
        }
      });
  };

  return (
    <div className="user-table">
      <h2>Registered Users</h2>
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
                  <>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setEditingUserId(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(user)}>Edit</button>
                    <button onClick={() => handleDelete(user.id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;



