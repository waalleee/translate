import { useState, useCallback, useRef } from 'react';
import languageMap from './languageMap';

export default function UploadCard({ onProgress }: { onProgress: (p: number) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [sourceLang, setSourceLang] = useState("Detect Language");
  const [targetLang, setTargetLang] = useState("English");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const resetState = () => {
    setFile(null);
    setSourceLang("Detect Language");
    setTargetLang("English");
    onProgress(0);
  };

  const handleTranslate = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('target_lang', languageMap[targetLang] || 'EN');

    if (sourceLang !== "Detect Language") {
      formData.append('source_lang', languageMap[sourceLang]);
    }

    try {
      setLoading(true);
      onProgress(0);

      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 3) + 1;
        if (currentProgress < 99) {
          onProgress(currentProgress);
        } else {
          clearInterval(progressInterval);
        }
      }, 150);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/translate/`, {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) throw new Error('Translation failed');

      const contentType = response.headers.get('content-type');

      if (contentType?.includes('application/json')) {
        const data = await response.json();
        if (data.file_url) {
          window.open(data.file_url, '_blank');
        } else {
          alert('No file_url returned from server.');
        }
      } else {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const contentDisposition = response.headers.get('content-disposition');
        let filename = 'translated_document';
        const match = contentDisposition?.match(/filename="?(.+)"?/);
        if (match?.[1]) {
          filename = match[1];
        } else if (file.name) {
          const ext = file.name.split('.').pop();
          filename = `translated_document.${ext}`;
        }

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      onProgress(100);
      setTimeout(resetState, 1500); // låt 100% visas en stund
    } catch (error) {
      console.error(error);
      alert('Translation failed. Check console.');
      onProgress(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-xl">
        <div
          className={`p-6 rounded-2xl shadow-soft border-2 border-dashed text-center relative transition-all ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <p className="text-subtle text-sm mb-4 truncate">
            {file ? `Selected file: ${file.name}` : 'Click or drag & drop your .docx, .pdf, or .txt file'}
          </p>

          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />

          <button
            type="button"
            className="inline-block w-40 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Choose File
          </button>
        </div>

        <div className="mt-4 flex gap-4">
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="w-1/2 min-w-[150px] border px-2 py-1 rounded-md"
          >
            {Object.keys(languageMap).map((lang) => (
              <option key={lang}>{lang}</option>
            ))}
          </select>

          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="w-1/2 min-w-[150px] border px-2 py-1 rounded-md"
          >
            {Object.keys(languageMap)
              .filter((lang) => lang !== "Detect Language")
              .map((lang) => (
                <option key={lang}>{lang}</option>
              ))}
          </select>
        </div>

        <button
          onClick={handleTranslate}
          className="w-full mt-4 min-w-[160px] bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
          disabled={loading}
        >
          {loading ? 'Translating...' : 'Translate Document'}
        </button>
      </div>
    </div>
  );
}


