import { useParams } from "react-router-dom";
import MovieGrid from "../components/MovieGrid";

export default function Compare() {
  const { userId } = useParams();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold">Comparing with {userId}</h2>
      <MovieGrid movies={[]} />
    </div>
  );
}
