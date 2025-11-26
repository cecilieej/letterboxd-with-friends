import { Link } from "react-router-dom";

export default function UserCard({ user }) {
  return (
    <Link
      to={`/compare/${user.uid}`}
      className="bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 transition block"
    >
      <h3 className="text-lg font-medium">{user.displayName}</h3>
      <p className="text-sm text-gray-400">{user.commonCount} movies in common</p>
    </Link>
  );
}
