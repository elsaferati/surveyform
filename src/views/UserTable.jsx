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

  const handleUpdate = async () => {
    try {
      const response = await fetch("http://localhost:8008/surveyform/api/update_user.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingUserId,
          name: editedUser.name,
          email: editedUser.email,
        }),
      });

      const data = await response.json();
      console.log("✅ Update response:", data);

      if (data.success) {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === editingUserId ? { ...user, ...editedUser } : user
          )
        );
        setEditingUserId(null);
      } else {
        alert(data.error || "Update failed");
      }
    } catch (error) {
      console.error("❌ Update fetch failed:", error);
      alert("Failed to update user.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
  
    try {
      const response = await fetch("http://localhost:8008/surveyform/api/delete_user.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
  
      const data = await response.json();
      console.log("✅ Delete response:", data);
  
      if (data.success) {
        fetchUsers(); // Refresh user list
      } else {
        alert(data.error || "Delete failed");
      }
    } catch (error) {
      console.error("❌ Delete fetch failed:", error);
      alert("Could not connect to the server.");
    }
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




