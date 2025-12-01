import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#141414] p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-3xl font-bold text-red-600 mb-10">N</h1>
        <nav className="space-y-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block cursor-pointer hover:text-red-500 ${isActive ? "text-red-500" : "text-gray-300"}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `block cursor-pointer hover:text-red-500 ${isActive ? "text-red-500" : "text-gray-300"}`
            }
          >
            Users
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `block cursor-pointer hover:text-red-500 ${isActive ? "text-red-500" : "text-gray-300"}`
            }
          >
            Movies
          </NavLink>
          <NavLink
            to="/bookings"
            className={({ isActive }) =>
              `block cursor-pointer hover:text-red-500 ${isActive ? "text-red-500" : "text-gray-300"}`
            }
          >
            Bookings
          </NavLink>
        </nav>
      </div>

      <p className="text-sm text-gray-500 mt-10">&copy; 2025 MovieApp</p>
    </aside>
  );
}
