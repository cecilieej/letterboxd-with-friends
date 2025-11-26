import { useAuth } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="w-full bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-2xl">🎬</span>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-300 transition-all">
              Letterboxd Friends
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className={`font-medium transition-colors ${
                    isActive('/dashboard')
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to={`/profile/${user.uid}`}
                  className={`font-medium transition-colors ${
                    isActive(`/profile/${user.uid}`)
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Profile
                </Link>
              </>
            )}
            
            <Link
              to="/help"
              className={`font-medium transition-colors ${
                isActive('/help')
                  ? 'text-blue-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Help
            </Link>

            {/* User Section */}
            {user ? (
              <div className="flex items-center space-x-3">
                {user.photoURL && (
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full border-2 border-gray-600 hover:border-blue-400 transition-colors"
                  />
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium px-3 py-1.5 rounded-md transition-colors"
                >
                  Logout
                </motion.button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}