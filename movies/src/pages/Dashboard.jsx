import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import FileUpload from "../components/FileUpload";
import MovieGrid from "../components/MovieGrid";
import { parseLetterboxdCsv } from "../utils/parseLetterboxdCsv";
import { enrichMovies } from "../utils/tmdb";
import { saveUserMovies } from "../utils/storage";

export default function Dashboard() {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  async function handleUpload(file) {
    setLoading(true);
    try {
      // Parse CSV
      const parsed = await parseLetterboxdCsv(file);
      console.log(`Parsed ${parsed.length} movies`);

      // Enrich with TMDb data
      const enriched = await enrichMovies(parsed, (current, total) => {
        setProgress({ current, total });
      });

      // Save to Firestore
      await saveUserMovies(user.uid, enriched);
      
      setMovies(enriched);
      alert("Movies uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading movies: " + error.message);
    } finally {
      setLoading(false);
      setProgress({ current: 0, total: 0 });
    }
  }

  if (!user)
    return <p className="p-8 text-center text-gray-300">Please log in.</p>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Your Dashboard</h2>

      <FileUpload onUpload={handleUpload} />

      {loading && (
        <div className="mt-4 p-4 bg-gray-800 rounded">
          <p className="text-gray-300">
            Processing movies... {progress.current} / {progress.total}
          </p>
          <div className="w-full bg-gray-700 rounded h-2 mt-2">
            <div
              className="bg-blue-500 h-2 rounded transition-all"
              style={{
                width: `${(progress.current / progress.total) * 100}%`
              }}
            />
          </div>
        </div>
      )}

      {movies.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3">
            Your Movies ({movies.length})
          </h3>
          <MovieGrid movies={movies} />
        </div>
      )}

      {!loading && movies.length === 0 && (
        <p className="mt-6 text-gray-400">
          Upload your Letterboxd CSV to see your movies here.
        </p>
      )}
    </div>
  );
}