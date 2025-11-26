import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MovieGrid from "../components/MovieGrid";
import { getUserMovies } from "../utils/storage";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase";

export default function Profile() {
  const { userId } = useParams(); // If userId in URL, show that user's profile
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [profileUser, setProfileUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, rated, recent
  
  const isOwnProfile = !userId || userId === user?.uid;
  const targetUserId = isOwnProfile ? user?.uid : userId;

  useEffect(() => {
    if (targetUserId) {
      loadProfile();
    }
  }, [targetUserId]);

  async function loadProfile() {
    setLoading(true);
    try {
      // Load user profile
      const userDoc = await getDoc(doc(db, 'users', targetUserId));
      if (userDoc.exists()) {
        setProfileUser({ uid: targetUserId, ...userDoc.data() });
      }

      // Load movies
      const userMovies = await getUserMovies(targetUserId);
      setMovies(userMovies);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return <p className="p-8 text-center text-gray-300">Please log in.</p>;
  }

  if (loading) {
    return <p className="p-8 text-center text-gray-300">Loading profile...</p>;
  }

  if (!profileUser) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-300 mb-4">Profile not found.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Filter movies
  const filteredMovies = movies.filter(movie => {
    if (filter === 'rated') return movie.rating && movie.rating > 0;
    if (filter === 'recent') return movie.watchedDate;
    return true;
  }).sort((a, b) => {
    if (filter === 'recent' && a.watchedDate && b.watchedDate) {
      return new Date(b.watchedDate) - new Date(a.watchedDate);
    }
    return 0;
  });

  const stats = {
    total: movies.length,
    rated: movies.filter(m => m.rating).length,
    avgRating: movies.filter(m => m.rating).length > 0
      ? (movies.reduce((sum, m) => sum + (m.rating || 0), 0) / movies.filter(m => m.rating).length).toFixed(1)
      : 'N/A',
    topRated: movies
      .filter(m => m.rating)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5)
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Profile Header */}
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8">
        <div className="flex items-start gap-6">
          {profileUser.photoURL && (
            <img
              src={profileUser.photoURL}
              alt={profileUser.displayName}
              className="w-24 h-24 rounded-full border-2 border-gray-600"
            />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{profileUser.displayName}</h1>
            <p className="text-gray-400 mb-4">{profileUser.email}</p>
            
            <div className="flex gap-6 text-sm">
              <div>
                <span className="text-gray-400">Movies: </span>
                <span className="font-semibold">{stats.total}</span>
              </div>
              <div>
                <span className="text-gray-400">Rated: </span>
                <span className="font-semibold">{stats.rated}</span>
              </div>
              <div>
                <span className="text-gray-400">Avg Rating: </span>
                <span className="font-semibold text-yellow-400">★ {stats.avgRating}</span>
              </div>
            </div>

            {!isOwnProfile && (
              <Link
                to={`/compare/${userId}`}
                className="inline-block mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
              >
                Compare Movies
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Top Rated Movies */}
      {stats.topRated.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Top Rated Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {stats.topRated.map((movie, i) => (
              <div key={i} className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="relative aspect-[2/3] bg-gray-700">
                  {movie.poster && movie.poster !== '/placeholder-poster.jpg' ? (
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      No Poster
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium line-clamp-1">{movie.title}</p>
                  <p className="text-xs text-yellow-400">★ {movie.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Movie Collection */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Movie Collection</h2>
          
          {/* Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded text-sm ${
                filter === 'all'
                  ? 'bg-blue-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('rated')}
              className={`px-3 py-1 rounded text-sm ${
                filter === 'rated'
                  ? 'bg-blue-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              Rated
            </button>
            <button
              onClick={() => setFilter('recent')}
              className={`px-3 py-1 rounded text-sm ${
                filter === 'recent'
                  ? 'bg-blue-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              Recent
            </button>
          </div>
        </div>

        {filteredMovies.length > 0 ? (
          <MovieGrid movies={filteredMovies} />
        ) : (
          <p className="text-gray-400 text-center py-12">
            No movies found with this filter.
          </p>
        )}
      </div>
    </div>
  );
}