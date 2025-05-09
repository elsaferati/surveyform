import React, { useEffect, useState } from "react";

export default function SurveyResults() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = () => {
    setLoading(true);
    fetch("http://localhost:8008/surveyform/backend/fetchSurveys.php")
      .then((res) => res.json())
      .then((data) => {
        setResponses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch survey data:", err);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    fetch(`http://localhost:8008/surveyform/api/deleteSurvey.php?id=${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => fetchSurveys())
      .catch((err) => console.error("Delete failed", err));
  };

  const handleEditClick = (response) => {
    setEditingId(response.id);
    setEditForm(response);
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    fetch("http://localhost:8008/surveyform/api/updateSurvey.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    })
      .then((res) => res.json())
      .then(() => {
        setEditingId(null);
        fetchSurveys();
      })
      .catch((err) => console.error("Update failed", err));
  };

  if (loading) return <p className="p-4">Loading survey results...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Survey Results</h1>
      <div className="overflow-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Q1</th>
              <th className="border px-4 py-2">Q2</th>
              <th className="border px-4 py-2">Q3</th>
              <th className="border px-4 py-2">Rating</th>
              <th className="border px-4 py-2">Age Group</th>
              <th className="border px-4 py-2">Feedback</th>
              <th className="border px-4 py-2">Submitted</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((res) => (
              <tr key={res.id} className="hover:bg-gray-50">
                {editingId === res.id ? (
                  <>
                    <td className="border px-2 py-1">
                      <input name="name" value={editForm.name} onChange={handleEditChange} />
                    </td>
                    <td className="border px-2 py-1">
                      <input name="email" value={editForm.email} onChange={handleEditChange} />
                    </td>
                    <td className="border px-2 py-1">
                      <input name="question1" value={editForm.question1} onChange={handleEditChange} />
                    </td>
                    <td className="border px-2 py-1">
                      <input name="question2" value={editForm.question2} onChange={handleEditChange} />
                    </td>
                    <td className="border px-2 py-1">
                      <input name="question3" value={editForm.question3} onChange={handleEditChange} />
                    </td>
                    <td className="border px-2 py-1">
                      <input name="rating" value={editForm.rating} onChange={handleEditChange} />
                    </td>
                    <td className="border px-2 py-1">
                      <input name="ageGroup" value={editForm.ageGroup} onChange={handleEditChange} />
                    </td>
                    <td className="border px-2 py-1">
                      <input name="feedbackType" value={editForm.feedbackType} onChange={handleEditChange} />
                    </td>
                    <td className="border px-2 py-1">{res.submitted_at}</td>
                    <td className="border px-2 py-1">
                    <button
  onClick={handleUpdate}
  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
>
  Save
</button>
<button
  onClick={() => setEditingId(null)}
  className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
>
  Cancel
</button>

                    </td>
                  </>
                ) : (
                  <>
                    <td className="border px-2 py-1">{res.name}</td>
                    <td className="border px-2 py-1">{res.email}</td>
                    <td className="border px-2 py-1">{res.question1}</td>
                    <td className="border px-2 py-1">{res.question2}</td>
                    <td className="border px-2 py-1">{res.question3}</td>
                    <td className="border px-2 py-1">{res.rating}</td>
                    <td className="border px-2 py-1">{res.ageGroup}</td>
                    <td className="border px-2 py-1">{res.feedbackType}</td>
                    <td className="border px-2 py-1">{res.submitted_at}</td>
                    <td className="border px-2 py-1">
                    <button
  onClick={() => handleEditClick(res)}
  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
>
  Edit
</button>
<button
  onClick={() => handleDelete(res.id)}
  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
>
  Delete
</button>

                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


