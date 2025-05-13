export default function UploadCard() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-soft text-center">
        <p className="text-subtle text-sm mb-4">
          Click or drag & drop your .docx, .pdf, or .txt file
        </p>
        <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
          Choose File
        </button>
      </div>
    </div>
  );
}




