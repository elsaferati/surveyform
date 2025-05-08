import React, { useEffect, useState } from 'react';

export default function SurveyResults() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = () => {
    fetch('http://localhost:8008/surveyform/backend/fetchSurveys.php')
      .then(res => res.json())
      .then(data => {
        setResponses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch survey data:", err);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this response?")) {
      fetch(`http://localhost:8008/surveyform/backend/deleteSurvey.php?id=${id}`, {
        method: 'DELETE',
      })
        .then(res => res.text())
        .then(() => {
          fetchSurveys();
        })
        .catch(err => console.error("Failed to delete:", err));
    }
  };

  const handleEdit = (id) => {
    const entry = responses.find(item => item.id === id);
    setEditingId(id);
    setEditedData({ ...entry });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    fetch('http://localhost:8008/surveyform/backend/updateSurvey.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedData)
    })
      .then(res => res.text())
      .then(() => {
        setEditingId(null);
        setEditedData({});
        fetchSurveys();
      })
      .catch(err => console.error("Failed to update:", err));
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
              <th className="border px-4 py-2">Feedback Type</th>
              <th className="border px-4 py-2">Submitted</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                {editingId === item.id ? (
                  <>
                    <td className="border px-4 py-2"><input name="name" value={editedData.name} onChange={handleChange} /></td>
                    <td className="border px-4 py-2"><input name="email" value={editedData.email} onChange={handleChange} /></td>
                    <td className="border px-4 py-2"><input name="question1" value={editedData.question1} onChange={handleChange} /></td>
                    <td className="border px-4 py-2"><input name="question2" value={editedData.question2} onChange={handleChange} /></td>
                    <td className="border px-4 py-2"><input name="question3" value={editedData.question3} onChange={handleChange} /></td>
                    <td className="border px-4 py-2"><input name="rating" value={editedData.rating} onChange={handleChange} /></td>
                    <td className="border px-4 py-2"><input name="ageGroup" value={editedData.ageGroup} onChange={handleChange} /></td>
                    <td className="border px-4 py-2"><input name="feedbackType" value={editedData.feedbackType} onChange={handleChange} /></td>
                    <td className="border px-4 py-2">{item.submitted_at}</td>
                    <td className="border px-4 py-2">
                      <button onClick={handleSave} className="text-green-600">💾 Save</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border px-4 py-2">{item.name}</td>
                    <td className="border px-4 py-2">{item.email}</td>
                    <td className="border px-4 py-2">{item.question1}</td>
                    <td className="border px-4 py-2">{item.question2}</td>
                    <td className="border px-4 py-2">{item.question3}</td>
                    <td className="border px-4 py-2">{item.rating}</td>
                    <td className="border px-4 py-2">{item.ageGroup}</td>
                    <td className="border px-4 py-2">{item.feedbackType}</td>
                    <td className="border px-4 py-2">{item.submitted_at}</td>
                    <td className="border px-4 py-2">
                      <button onClick={() => handleEdit(item.id)} className="text-blue-600 mr-2">✏️ Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="text-red-600">🗑 Delete</button>
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

