import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [search, setSearch] = useState("");

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-xl sticky top-0 z-50 backdrop-blur-md border-b border-gray-700">
      
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide hover:text-green-400 transition duration-300 flex items-center gap-2"
      >
        🎟️ <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">EventBooking</span>
      </Link>

      

      {/* Search Bar (NEW) */}
      <div className="hidden md:flex flex-1 justify-center px-6">
        <div className="w-full max-w-lg relative">
          <input
            type="text"
            placeholder="Search events, locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-2 rounded-full bg-gray-800/70 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm placeholder-gray-400"
          />
          <span className="absolute right-4 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      {/* Menu */}
      <div className="flex items-center gap-6 text-sm font-medium">
        
        <Link
        to="/"
        className="text-1xl tracking-wide hover:text-green-400 transition duration-300 flex items-center gap-2"
      >
        <span className="hover:text-green-400 transition duration-300 relative group">Home</span>
      </Link>

        {user && (
          <Link
            to="/bookings"
            className="hover:text-green-400 transition duration-300 relative group"
          >
            My Bookings
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-400 transition-all group-hover:w-full"></span>
          </Link>
        )}

        {user?.role === "admin" && (
          <Link
            to="/admin"
            className="hover:text-yellow-400 transition duration-300 relative group"
          >
            Admin
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all group-hover:w-full"></span>
          </Link>
        )}

        {user ? (
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full shadow-lg transition duration-300 hover:scale-105"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:text-green-400 transition duration-300"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-5 py-2 rounded-full shadow-lg transition duration-300 hover:scale-105"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;