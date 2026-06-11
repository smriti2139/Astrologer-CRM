import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useParams, useNavigate } from "react-router-dom";

function EditAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [appointment, setAppointment] =
    useState({
      appointmentDate: "",
      status: "Scheduled",
      notes: "",
    });

  useEffect(() => {
    fetchAppointment();
  }, []);

  const fetchAppointment = async () => {
    const token = localStorage.getItem("token");

    const { data } = await axios.get(
      "http://localhost:5000/api/appointments",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const current = data.find(
      (item) => item._id === id
    );

    if (current) {
      setAppointment({
        appointmentDate:
          current.appointmentDate.slice(0, 16),
        status: current.status,
        notes: current.notes || "",
      });
    }
  };

  const handleChange = (e) => {
    setAppointment({
      ...appointment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/appointments/${id}`,
        appointment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Appointment Updated");

      navigate("/appointments-list");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">

          <h1 className="text-3xl font-bold mb-6">
            Edit Appointment
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="datetime-local"
              name="appointmentDate"
              value={appointment.appointmentDate}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <select
              name="status"
              value={appointment.status}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            >
              <option>Scheduled</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>

            <textarea
              name="notes"
              value={appointment.notes}
              onChange={handleChange}
              rows="4"
              className="w-full border p-3 rounded"
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded"
            >
              Update Appointment
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default EditAppointment;