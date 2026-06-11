import { Link } from "react-router-dom";

function Sidebar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="w-64 h-screen bg-indigo-700 text-white p-5">
      <h1 className="text-2xl font-bold mb-8">
        🔮 Astrologer CRM
      </h1>

      <ul className="space-y-4">

        <Link to="/dashboard">
          <li className="cursor-pointer hover:text-gray-200">
            📊 Dashboard
          </li>
        </Link>

        <Link to="/clients">
          <li className="cursor-pointer hover:text-gray-200">
            👤 Clients
          </li>
        </Link>

        <Link to="/add-client">
          <li className="cursor-pointer hover:text-gray-200">
            ➕ Add Client
          </li>
        </Link>

        <Link to="/appointments">
          <li className="cursor-pointer hover:text-gray-200">
            📅 Schedule Appointment
          </li>
        </Link>

        <Link to="/appointments-list">
          <li className="cursor-pointer hover:text-gray-200">
            📋 Appointment List
          </li>
        </Link>

        <li
          onClick={handleLogout}
          className="cursor-pointer hover:text-red-300"
        >
          🚪 Logout
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;