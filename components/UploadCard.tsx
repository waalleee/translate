import { useState, useCallback } from 'react';

export default function UploadCard({ onProgress }: { onProgress: (p: number) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files[0]) {
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

  const handleTranslate = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      onProgress(0);

      // Fake progress animation
      let p = 0;
      const fakeProgress = setInterval(() => {
        p += 10;
        onProgress(p);
        if (p >= 90) clearInterval(fakeProgress);
      }, 300);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/translate`, {
        method: 'POST',
        body: formData,
      });

      clearInterval(fakeProgress);

      if (!response.ok) {
        throw new Error('Translation failed');
      }

      // Try JSON first (if file_url returned)
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        const data = await response.json();
        if (data.file_url) {
          // Download via URL
          window.open(data.file_url, '_blank');
        } else {
          alert('No file URL returned from server.');
        }
      } else {
        // If not JSON, assume it's a blob (file download)
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const contentDisposition = response.headers.get('content-disposition');
        let filename = 'translated_document';

        if (contentDisposition) {
          const match = contentDisposition.match(/filename="?(.+)"?/);
          if (match?.[1]) {
            filename = match[1];
          }
        }

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      onProgress(100);
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
      <div>
        <div
          className={`w-full max-w-xl mx-auto p-6 rounded-2xl shadow-soft border-2 border-dashed text-center ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <p className="text-subtle text-sm mb-4">
            {file ? `Selected file: ${file.name}` : 'Click or drag & drop your .docx, .pdf, or .txt file'}
          </p>
          <input type="file" onChange={handleFileChange} className="hidden" id="fileUpload" />
          <label htmlFor="fileUpload" className="inline-block bg-black text-white px-6 py-2 rounded-md cursor-pointer hover:bg-gray-800 transition">
            Choose File
          </label>
        </div>

        <button
          onClick={handleTranslate}
          className="w-full mt-4 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
          disabled={loading}
        >
          {loading ? 'Translating...' : 'Translate Document'}
        </button>
      </div>
    </div>
  );
}






