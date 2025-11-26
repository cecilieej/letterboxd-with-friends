import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="w-full bg-gray-800 p-4 shadow-md border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold text-white hover:text-blue-400 transition">
          🎬 Cece's Letterboxd Friends
        </Link>

        <div className="flex items-center gap-4">
          {user && (
            <>
              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-white transition"
              >
                Dashboard
              </Link>
              <Link
                to={`/profile/${user.uid}`}
                className="text-gray-300 hover:text-white transition"
              >
                Profile
              </Link>
            </>
          )}
          
          <Link
            to="/help"
            className="text-gray-300 hover:text-white transition"
          >
            Help
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-8 h-8 rounded-full border border-gray-600"
                />
              )}
              <button
                onClick={logout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}