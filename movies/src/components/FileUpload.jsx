export default function FileUpload({ onUpload }) {
  function handleFile(e) {
    const file = e.target.files[0];
    if (file) onUpload(file);
  }

  return (
    <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
      <label className="block text-gray-300 mb-2">Upload Letterboxd CSV:</label>
      <input
        type="file"
        accept=".csv"
        onChange={handleFile}
        className="text-gray-100"
      />
    </div>
  );
}
