import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Clients() {
  const [clients, setClients] = useState([]);

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

  const deleteClient = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this client?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/clients/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Client Deleted");

      fetchClients();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">
            Clients
          </h1>

          <Link to="/add-client">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded">
              Add Client
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Phone
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Birth Place
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {clients.map((client) => (
                <tr
                  key={client._id}
                  className="border-b"
                >
                  <td className="p-4">
                    {client.name}
                  </td>

                  <td className="p-4">
                    {client.phone}
                  </td>

                  <td className="p-4">
                    {client.email}
                  </td>

                  <td className="p-4">
                    {client.birthPlace}
                  </td>

                  <td className="p-4 space-x-3">
                    <Link
                      to={`/edit-client/${client._id}`}
                    >
                      <button className="text-blue-600">
                        Edit
                      </button>
                    </Link>

                    <button
                      onClick={() =>
                        deleteClient(client._id)
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

          {clients.length === 0 && (
            <p className="p-6 text-center text-gray-500">
              No clients found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Clients;