export default function MovieGrid({ movies }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {movies.map((movie, i) => (
        <div key={i} className="bg-gray-800 p-3 rounded shadow">
          <img src={movie.poster} alt={movie.title} className="rounded mb-2" />
          <h4 className="font-medium">{movie.title}</h4>
        </div>
      ))}
    </div>
  );
}
