import React, { useEffect, useState } from 'react';

export default function SurveyResults() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

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
            </tr>
          </thead>
          <tbody>
            {responses.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.email}</td>
                <td className="border px-4 py-2">{item.question1}</td>
                <td className="border px-4 py-2">{item.question2}</td>
                <td className="border px-4 py-2">{item.question3}</td>
                <td className="border px-4 py-2">{item.rating}</td>
                <td className="border px-4 py-2">{item.ageGroup}</td>
                <td className="border px-4 py-2">{item.feedbackType}</td>
                <td className="border px-4 py-2">{item.submitted_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
