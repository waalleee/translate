
const UploadCard = () => (
  <div className="border-dashed border-2 border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center hover:shadow-lg transition-shadow">
    <p className="text-gray-500 mb-4">Click or drag & drop your .docx, .pdf, or .txt file</p>
    <input type="file" className="hidden" id="file-upload" />
    <label htmlFor="file-upload" className="cursor-pointer bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
      Choose File
    </label>
  </div>
);

export default UploadCard;
