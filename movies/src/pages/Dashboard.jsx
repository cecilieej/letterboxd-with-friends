import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import FileUpload from "../components/FileUpload";
import MovieGrid from "../components/MovieGrid";
import UserCard from "../components/UserCard";
import { parseLetterboxdCsv } from "../utils/parseLetterboxdCsv";
import { enrichMovies } from "../utils/tmdb";
import { saveUserMovies, getUserMovies, getAllUsers, saveUserProfile } from "../utils/storage";
import { getComparisonStats } from "../utils/compareLists";

export default function Dashboard() {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [friends, setFriends] = useState([]);
  const [activeTab, setActiveTab] = useState('overview'); // overview, movies, friends

  // Load user's existing movies and friends on mount
  useEffect(() => {
    if (user) {
      loadUserData();
      loadFriends();
      // Save user profile on login
      saveUserProfile(user.uid, {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      });
    }
  }, [user]);

  async function loadUserData() {
    try {
      const userMovies = await getUserMovies(user.uid);
      setMovies(userMovies);
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      setLoadingMovies(false);
    }
  }

  async function loadFriends() {
    try {
      const allUsers = await getAllUsers();
      // Filter out current user and calculate common movies
      const friendsWithStats = allUsers
        .filter(u => u.uid !== user.uid)
        .map(friend => {
          const stats = getComparisonStats(movies, friend.movies || []);
          return {
            ...friend,
            commonCount: stats.commonCount,
            similarity: stats.similarity
          };
        })
        .sort((a, b) => b.commonCount - a.commonCount); // Sort by most in common
      
      setFriends(friendsWithStats);
    } catch (error) {
      console.error('Error loading friends:', error);
    }
  }

  async function handleUpload(file) {
    setLoading(true);
    try {
      const parsed = await parseLetterboxdCsv(file);
      console.log(`Parsed ${parsed.length} movies`);

      const enriched = await enrichMovies(parsed, (current, total) => {
        setProgress({ current, total });
      });

      await saveUserMovies(user.uid, enriched);
      setMovies(enriched);
      
      // Reload friends to update common counts
      await loadFriends();
      
      alert("Movies uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading movies: " + error.message);
    } finally {
      setLoading(false);
      setProgress({ current: 0, total: 0 });
    }
  }

  if (!user) {
    return <p className="p-8 text-center text-gray-300">Please log in.</p>;
  }

  const stats = {
    totalMovies: movies.length,
    avgRating: movies.filter(m => m.rating).length > 0
      ? (movies.reduce((sum, m) => sum + (m.rating || 0), 0) / movies.filter(m => m.rating).length).toFixed(1)
      : 'N/A',
    topFriends: friends.slice(0, 3)
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header with User Info */}
      <div className="flex items-center gap-4 mb-8">
        {user.photoURL && (
          <img 
            src={user.photoURL} 
            alt={user.displayName}
            className="w-16 h-16 rounded-full border-2 border-gray-700"
          />
        )}
        <div>
          <h2 className="text-3xl font-bold">Welcome, {user.displayName?.split(' ')[0]}!</h2>
          <p className="text-gray-400">Your movie collection dashboard</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-700">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'overview'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('movies')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'movies'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          My Movies ({movies.length})
        </button>
        <button
          onClick={() => setActiveTab('friends')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'friends'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Friends ({friends.length})
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="text-sm text-gray-400 mb-1">Total Movies</div>
              <div className="text-3xl font-bold text-blue-400">{stats.totalMovies}</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="text-sm text-gray-400 mb-1">Average Rating</div>
              <div className="text-3xl font-bold text-yellow-400">★ {stats.avgRating}</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="text-sm text-gray-400 mb-1">Friends</div>
              <div className="text-3xl font-bold text-purple-400">{friends.length}</div>
            </div>
          </div>

          {/* Upload Section */}
          <div>
            <h3 className="text-xl font-semibold mb-3">
              {movies.length > 0 ? 'Update Your Collection' : 'Upload Your Movies'}
            </h3>
            <FileUpload onUpload={handleUpload} />
            
            {loading && (
              <div className="mt-4 p-4 bg-gray-800 rounded border border-gray-700">
                <p className="text-gray-300 mb-2">
                  Processing movies... {progress.current} / {progress.total}
                </p>
                <div className="w-full bg-gray-700 rounded h-2">
                  <div
                    className="bg-blue-500 h-2 rounded transition-all"
                    style={{
                      width: `${(progress.current / progress.total) * 100}%`
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Top Friends */}
          {stats.topFriends.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-3">Top Movie Buddies</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {stats.topFriends.map(friend => (
                  <UserCard key={friend.uid} user={friend} />
                ))}
              </div>
              {friends.length > 3 && (
                <button
                  onClick={() => setActiveTab('friends')}
                  className="mt-4 text-blue-400 hover:text-blue-300"
                >
                  View all friends →
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Movies Tab */}
      {activeTab === 'movies' && (
        <div>
          {loadingMovies ? (
            <p className="text-gray-400">Loading your movies...</p>
          ) : movies.length > 0 ? (
            <MovieGrid movies={movies} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">No movies uploaded yet.</p>
              <button
                onClick={() => setActiveTab('overview')}
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
              >
                Upload Movies
              </button>
            </div>
          )}
        </div>
      )}

      {/* Friends Tab */}
      {activeTab === 'friends' && (
        <div>
          {friends.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {friends.map(friend => (
                <UserCard key={friend.uid} user={friend} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No other users found yet.</p>
              <p className="text-gray-500 text-sm mt-2">
                Share this app with friends so they can upload their lists!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}