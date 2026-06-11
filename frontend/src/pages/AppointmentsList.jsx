import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        "https://astrologer-crm-backend.onrender.com/api/appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAppointment = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://astrologer-crm-backend.onrender.com/api/appointments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Appointment Deleted");

      fetchAppointments();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">
          Appointments
        </h1>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-4 text-left">
                  Client
                </th>

                <th className="p-4 text-left">
                  Date
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Notes
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => (
                <tr
                  key={appointment._id}
                  className="border-b"
                >
                  <td className="p-4">
                    {appointment.client?.name}
                  </td>

                  <td className="p-4">
                    {new Date(
                      appointment.appointmentDate
                    ).toLocaleString()}
                  </td>

                  <td className="p-4">
                    {appointment.status}
                  </td>

                  <td className="p-4">
                    {appointment.notes}
                  </td>

                  <td className="p-4 space-x-3">
                    <Link
                      to={`/edit-appointment/${appointment._id}`}
                    >
                      <button className="text-blue-600">
                        Edit
                      </button>
                    </Link>

                    <button
                      onClick={() =>
                        deleteAppointment(
                          appointment._id
                        )
                      }
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {appointments.length === 0 && (
            <p className="p-6 text-center">
              No appointments found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AppointmentsList;