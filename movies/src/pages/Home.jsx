import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const { user, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  async function handleLogin() {
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      alert('Failed to login. Please try again.');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-8 pt-20 pb-16 text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Cece's Letterboxd Friends
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Welcome to my very own Letterboxd site! This is mostly for private use between my friends and I. Here, you can compare watchlists,
            discover what you have in common with other users, and find out what film to watch together next.
          </p>
        </div>

        <button
          onClick={handleLogin}
          className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-xl text-white text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Get Started Here
        </button>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Compare Lists</h3>
            <p className="text-gray-400">
              See what movies Cece's friends and other users have both watched, rated, and loved.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Find Matches</h3>
            <p className="text-gray-400">
              Discover your movie taste compatibility with friends and find out what you both want to watch next.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">Explore Together</h3>
            <p className="text-gray-400">
              Get recommendations based on what you and your friends enjoy watching.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-20 text-left">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Export from Letterboxd</h4>
                <p className="text-gray-400">
                  Go to Letterboxd → Settings → Import & Export → Export Your Data
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Upload Your CSV</h4>
                <p className="text-gray-400">
                  Sign in and upload your watched.csv file to your dashboard
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Compare with Friends</h4>
                <p className="text-gray-400">
                  Browse other users and see your shared movie experiences
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}