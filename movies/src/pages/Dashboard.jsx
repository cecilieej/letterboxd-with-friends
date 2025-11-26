import { useAuth } from "../context/AuthContext";
import FileUpload from "../components/FileUpload";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user)
    return <p className="p-8 text-center text-gray-300">Please log in.</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Your Dashboard</h2>

      <FileUpload onUpload={(file) => console.log(file)} />

      <p className="mt-6 text-gray-400">
        After uploading, your movies will appear here.
      </p>
    </div>
  );
}
