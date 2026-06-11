import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalAppointments: 0,
    completedAppointments: 0,
    scheduledAppointments: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        "https://astrologer-crm-backend.onrender.com/api/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">
          Dashboard
        </h1>

        <div className="grid grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-500">
              Total Clients
            </h2>

            <p className="text-3xl font-bold">
              {stats.totalClients}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-500">
              Total Appointments
            </h2>

            <p className="text-3xl font-bold">
              {stats.totalAppointments}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-500">
              Completed
            </h2>

            <p className="text-3xl font-bold">
              {stats.completedAppointments}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-500">
              Scheduled
            </h2>

            <p className="text-3xl font-bold">
              {stats.scheduledAppointments}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;