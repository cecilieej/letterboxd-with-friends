import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="w-full bg-gray-800 p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-semibold text-white">
        Cece's Letterboxd Friends
      </Link>

      {user ? (
        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      ) : (
        <></>
      )}
    </nav>
  );
}
