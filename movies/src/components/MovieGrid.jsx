export default function MovieGrid({ movies }) {
  if (!movies || movies.length === 0) {
    return <p className="text-gray-400">No movies to display.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
      {movies.map((movie, i) => (
        <div
          key={i}
          className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition group"
        >
          <div className="relative aspect-[2/3] bg-gray-700">
            {movie.poster && movie.poster !== '/placeholder-poster.jpg' ? (
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No Poster
              </div>
            )}
          </div>
          <div className="p-3">
            <h4 className="font-medium text-sm line-clamp-2 group-hover:text-blue-400 transition">
              {movie.title}
            </h4>
            {movie.year && (
              <p className="text-xs text-gray-400 mt-1">{movie.year}</p>
            )}
            {movie.rating && (
              <p className="text-xs text-yellow-400 mt-1">
                ★ {movie.rating}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}