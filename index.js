import { useState } from "react";
import axios from "axios";

export default function TranslatorUploader() {
  const [file, setFile] = useState(null);
  const [targetLang, setTargetLang] = useState("EN");
  const [isLoading, setIsLoading] = useState(false);
  const [translatedFileUrl, setTranslatedFileUrl] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadAndTranslate = async () => {
    if (!file) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("target_lang", targetLang);

    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/translate/", formData, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setTranslatedFileUrl(url);
    } catch (error) {
      console.error("Translation failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <section className="text-center py-20 px-4">
        <h1 className="text-5xl font-semibold mb-4 tracking-tight">Effortless Document Translation</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Instantly translate your Word, PDF, and text documents into multiple languages. No registration required.
        </p>
      </section>
      <section className="flex items-center justify-center px-4">
        <div className="w-full max-w-2xl py-12">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-gray-300 p-12 text-center rounded-2xl transition hover:border-gray-500"
          >
            <input type="file" accept=".docx,.pdf,.txt" onChange={handleFileChange} className="hidden" id="fileInput" />
            <label htmlFor="fileInput" className="cursor-pointer block text-lg">
              {file ? file.name : "Click or drag & drop your .docx, .pdf, or .txt file here"}
            </label>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="p-2 border rounded-lg shadow-sm focus:outline-none"
            >
              <option value="EN">English</option>
              <option value="SV">Swedish</option>
              <option value="FR">French</option>
              <option value="DE">German</option>
              <option value="ES">Spanish</option>
            </select>
            <button
              onClick={uploadAndTranslate}
              className="bg-black text-white px-6 py-2 rounded-lg text-lg font-medium hover:opacity-90 transition"
              disabled={isLoading}
            >
              {isLoading ? "Translating..." : "Translate"}
            </button>
          </div>
          {translatedFileUrl && (
            <div className="text-center mt-8">
              <a
                href={translatedFileUrl}
                download={`translated_${file.name}`}
                className="text-blue-600 underline text-lg"
              >
                Download Translated Document
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
