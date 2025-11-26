import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MovieGrid from "../components/MovieGrid";
import { getUserMovies } from "../utils/storage";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { getComparisonStats } from "../utils/compareLists";

export default function Compare() {
  const { userId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [friendProfile, setFriendProfile] = useState(null);
  const [userMovies, setUserMovies] = useState([]);
  const [friendMovies, setFriendMovies] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('common'); // common, userOnly, friendOnly

  useEffect(() => {
    if (user && userId) {
      loadComparisonData();
    }
  }, [user, userId]);

  async function loadComparisonData() {
    setLoading(true);
    try {
      // Load friend's profile
      const friendDoc = await getDoc(doc(db, 'users', userId));
      if (friendDoc.exists()) {
        setFriendProfile({ uid: userId, ...friendDoc.data() });
      }

      // Load both users' movies
      const [userMoviesList, friendMoviesList] = await Promise.all([
        getUserMovies(user.uid),
        getUserMovies(userId)
      ]);

      setUserMovies(userMoviesList);
      setFriendMovies(friendMoviesList);

      // Calculate comparison stats
      const comparisonStats = getComparisonStats(userMoviesList, friendMoviesList);
      setStats(comparisonStats);
    } catch (error) {
      console.error('Error loading comparison:', error);
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return <p className="p-8 text-center text-gray-300">Please log in.</p>;
  }

  if (loading) {
    return <p className="p-8 text-center text-gray-300">Loading comparison...</p>;
  }

  if (!friendProfile || !stats) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-300 mb-4">Unable to load comparison data.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const displayMovies = view === 'common' 
    ? stats.common 
    : view === 'userOnly' 
    ? stats.userUnique 
    : stats.friendUnique;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Comparison Header */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-8 rounded-xl border border-blue-700/30 mb-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Movie Taste Comparison</h1>
        
        <div className="flex justify-between items-center max-w-3xl mx-auto">
          {/* Current User */}
          <div className="text-center">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-20 h-20 rounded-full border-2 border-blue-500 mx-auto mb-2"
              />
            )}
            <p className="font-semibold">{user.displayName}</p>
            <p className="text-sm text-gray-400">{stats.totalUser} movies</p>
          </div>

          {/* Similarity Score */}
          <div className="text-center px-8">
            <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
              {stats.similarity}%
            </div>
            <p className="text-gray-400 mt-2">similarity</p>
          </div>

          {/* Friend */}
          <div className="text-center">
            {friendProfile.photoURL && (
              <img
                src={friendProfile.photoURL}
                alt={friendProfile.displayName}
                className="w-20 h-20 rounded-full border-2 border-purple-500 mx-auto mb-2"
              />
            )}
            <p className="font-semibold">{friendProfile.displayName}</p>
            <p className="text-sm text-gray-400">{stats.totalFriend} movies</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="bg-gray-800/50 p-4 rounded-lg text-center border border-gray-700">
            <div className="text-2xl font-bold text-green-400">{stats.commonCount}</div>
            <div className="text-sm text-gray-400">Movies in Common</div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg text-center border border-gray-700">
            <div className="text-2xl font-bold text-blue-400">{stats.userUnique.length}</div>
            <div className="text-sm text-gray-400">Only You've Seen</div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg text-center border border-gray-700">
            <div className="text-2xl font-bold text-purple-400">{stats.friendUnique.length}</div>
            <div className="text-sm text-gray-400">Only They've Seen</div>
          </div>
        </div>
      </div>

      {/* View Selector */}
      <div className="flex gap-2 mb-6 border-b border-gray-700">
        <button
          onClick={() => setView('common')}
          className={`px-4 py-2 font-medium transition ${
            view === 'common'
              ? 'text-green-400 border-b-2 border-green-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Both Watched ({stats.commonCount})
        </button>
        <button
          onClick={() => setView('userOnly')}
          className={`px-4 py-2 font-medium transition ${
            view === 'userOnly'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Only You ({stats.userUnique.length})
        </button>
        <button
          onClick={() => setView('friendOnly')}
          className={`px-4 py-2 font-medium transition ${
            view === 'friendOnly'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Only {friendProfile.displayName?.split(' ')[0]} ({stats.friendUnique.length})
        </button>
      </div>

      {/* Helpful Text */}
      <div className="mb-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        {view === 'common' && (
          <p className="text-gray-300">
            🎬 These are movies you've both watched! Great picks for discussing or finding similar recommendations.
          </p>
        )}
        {view === 'userOnly' && (
          <p className="text-gray-300">
            💡 Movies you've seen that {friendProfile.displayName?.split(' ')[0]} hasn't. Consider recommending these!
          </p>
        )}
        {view === 'friendOnly' && (
          <p className="text-gray-300">
            🍿 Movies {friendProfile.displayName?.split(' ')[0]} has watched that you haven't. Maybe add these to your watchlist?
          </p>
        )}
      </div>

      {/* Movie Grid */}
      {displayMovies.length > 0 ? (
        <MovieGrid movies={displayMovies} />
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p>No movies in this category.</p>
        </div>
      )}
    </div>
  );
}