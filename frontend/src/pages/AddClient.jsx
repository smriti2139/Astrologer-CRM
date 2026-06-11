import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
function AddClient() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    dob: "",
    birthTime: "",
    birthPlace: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://astrologer-crm-backend.onrender.com/api/clients",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Client Added Successfully");

      setFormData({
        name: "",
        phone: "",
        email: "",
        dob: "",
        birthTime: "",
        birthPlace: "",
        notes: "",
      });
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to add client"
      );
    }
  };

  return (
  <div className="flex">
    <Sidebar />

    <div className="flex-1 p-8 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6">
          Add Client
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="time"
            name="birthTime"
            value={formData.birthTime}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="birthPlace"
            placeholder="Birth Place"
            value={formData.birthPlace}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <textarea
            name="notes"
            placeholder="Notes"
            rows="4"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700"
          >
            Save Client
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default AddClient;