import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function SurveyForm() {
  const navigate = useNavigate(); // ✅ Move here
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    question1: "",
    question2: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost/surveyapp/submitSurvey.php", formData);
      navigate("/thank-you"); // ✅ Redirect after successful submission
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <input name="name" onChange={handleChange} placeholder="Your Name" required />
      <input name="email" onChange={handleChange} placeholder="Your Email" required />
      <textarea name="question1" onChange={handleChange} placeholder="What do you think about our service?" />
      <textarea name="question2" onChange={handleChange} placeholder="What can we improve?" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default SurveyForm;
