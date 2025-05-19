import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SurveyForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question1: '',
    question2: '',
    question3: '',
    rating: '',
    ageGroup: '',
    feedbackType: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const validationErrors = {};
    if (!formData.name) validationErrors.name = 'Name is required';
    if (!formData.email) validationErrors.email = 'Email is required';
    if (!formData.question1) validationErrors.question1 = 'Question 1 is required';
    if (!formData.question2) validationErrors.question2 = 'Question 2 is required';
    if (!formData.question3) validationErrors.question3 = 'Question 3 is required';
    if (!formData.rating) validationErrors.rating = 'Rating is required';
    if (!formData.ageGroup) validationErrors.ageGroup = 'Age group is required';
    if (!formData.feedbackType) validationErrors.feedbackType = 'Feedback type is required';

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      await axios.post(
        'http://localhost:8008/surveyform/src/controllers/submitSurvey.php',
        {
          ...formData,
          rating: parseInt(formData.rating) // ✅ Ensure rating is an integer
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      navigate('/thank-you');
    } catch (err) {
      console.error(err);
      alert('Submission failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow p-4">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto space-y-6 border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
              Customer Satisfaction Survey
            </h2>

            {/* Name */}
            <div>
              <label className="block mb-2 font-medium">Full Name</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-400"
              />
              {errors.name && <span className="text-red-600 text-sm">{errors.name}</span>}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium">Email Address</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-400"
              />
              {errors.email && <span className="text-red-600 text-sm">{errors.email}</span>}
            </div>

            {/* Question 1 */}
            <div>
              <label className="block mb-2 font-medium">1. What do you think about our service?</label>
              <textarea
                name="question1"
                rows="3"
                value={formData.question1}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-400"
              />
              {errors.question1 && <span className="text-red-600 text-sm">{errors.question1}</span>}
            </div>

            {/* Question 2 */}
            <div>
              <label className="block mb-2 font-medium">2. What can we improve?</label>
              <textarea
                name="question2"
                rows="3"
                value={formData.question2}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-400"
              />
              {errors.question2 && <span className="text-red-600 text-sm">{errors.question2}</span>}
            </div>

            {/* Question 3 */}
            <div>
              <label className="block mb-2 font-medium">3. Would you recommend us to others?</label>
              <div className="flex space-x-4">
                {['Yes', 'No', 'Maybe'].map(opt => (
                  <label key={opt} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="question3"
                      value={opt}
                      checked={formData.question3 === opt}
                      onChange={handleChange}
                      required
                      className="form-radio"
                    />
                    <span className="ml-2">{opt}</span>
                  </label>
                ))}
              </div>
              {errors.question3 && <span className="text-red-600 text-sm">{errors.question3}</span>}
            </div>

            {/* Rating */}
            <div>
              <label className="block mb-2 font-medium">4. Overall rating (1–5)</label>
              <div className="flex space-x-3">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, rating: String(n) }))}
                    className={`px-4 py-2 rounded-lg border ${
                      formData.rating === String(n)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              {errors.rating && <span className="text-red-600 text-sm">{errors.rating}</span>}
            </div>

            {/* Age Group */}
            <div>
              <label className="block mb-2 font-medium">Age Group</label>
              <select
                name="ageGroup"
                value={formData.ageGroup}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Age Group</option>
                <option value="18-25">18-25</option>
                <option value="26-35">26-35</option>
                <option value="36-45">36-45</option>
                <option value="46+">46+</option>
              </select>
              {errors.ageGroup && <span className="text-red-600 text-sm">{errors.ageGroup}</span>}
            </div>

            {/* Feedback Type */}
            <div>
              <label className="block mb-2 font-medium">Feedback Type</label>
              <select
                name="feedbackType"
                value={formData.feedbackType}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Feedback Type</option>
                <option value="Positive">Positive</option>
                <option value="Neutral">Neutral</option>
                <option value="Negative">Negative</option>
              </select>
              {errors.feedbackType && <span className="text-red-600 text-sm">{errors.feedbackType}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

