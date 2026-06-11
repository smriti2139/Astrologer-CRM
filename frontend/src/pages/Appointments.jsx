import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Appointments() {
  const [clients, setClients] = useState([]);

  const [formData, setFormData] = useState({
    client: "",
    appointmentDate: "",
    notes: "",
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        "http://localhost:5000/api/clients",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setClients(data);
    } catch (error) {
      console.log(error);
    }
  };

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
        "http://localhost:5000/api/appointments",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Appointment Created");

      setFormData({
        client: "",
        appointmentDate: "",
        notes: "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to create appointment");
    }
  };

  return (
 
  <div className="flex">
    <Sidebar />

    <div className="flex-1 p-8 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6">
          Schedule Appointment
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <select
            name="client"
            value={formData.client}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          >
            <option value="">
              Select Client
            </option>

            {clients.map((client) => (
              <option
                key={client._id}
                value={client._id}
              >
                {client.name}
              </option>
            ))}
          </select>

          <input
            type="datetime-local"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <textarea
            name="notes"
            placeholder="Appointment Notes"
            rows="4"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded"
          >
            Schedule Appointment
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Appointments;