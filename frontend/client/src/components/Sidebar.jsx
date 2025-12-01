import { FiHome, FiUsers, FiFilm, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Sidebar({ logout }) {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <nav className="flex flex-col gap-4">
        <Link to="/dashboard" className="flex items-center gap-2 hover:text-blue-400"><FiHome /> Dashboard</Link>
        <Link to="/users" className="flex items-center gap-2 hover:text-blue-400"><FiUsers /> Users</Link>
        <Link to="/movies" className="flex items-center gap-2 hover:text-blue-400"><FiFilm /> Movies</Link>
        <button onClick={logout} className="mt-auto flex items-center gap-2 text-red-500 hover:text-red-400">
          <FiLogOut /> Logout
        </button>
      </nav>
    </div>
  );
}
