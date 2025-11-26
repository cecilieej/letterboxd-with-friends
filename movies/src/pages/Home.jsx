import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user, loginWithGoogle } = useAuth();

  return (
    <div className="p-8 max-w-2xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Cece's Letterboxd Friends
      </h1>
      <p className="text-gray-400 mb-6">
        Upload your Letterboxd data and compare your watched lists and watchlists with friends.
      </p>

      {!user && (
        <button
          onClick={loginWithGoogle}
          className="bg-blue-600 px-6 py-3 rounded-lg text-white text-lg hover:bg-blue-700"
        >
          Login with Google
        </button>
      )}

      {user && (
        <p className="text-green-300 font-medium">You’re logged in!</p>
      )}
    </div>
  );
}
