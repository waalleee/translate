
import HeroSection from "../components/HeroSection";
import UploadCard from "../components/UploadCard";
import LanguageSelector from "../components/LanguageSelector";
import ProgressLoader from "../components/ProgressLoader";
import InspirationSection from "../components/InspirationSection";
import Footer from "../components/Footer";
import { useState } from "react";

export default function Home() {
  const [progress, setProgress] = useState(0);

  const handleTranslate = () => {
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setProgress(p);
      if (p >= 100) clearInterval(interval);
    }, 300);
  };

  return (
    <div>
      <HeroSection />
      <main className="max-w-4xl mx-auto px-4">
        <UploadCard />
        <LanguageSelector />
        <button
          onClick={handleTranslate}
          className="w-full bg-black text-white py-3 rounded-md mt-4 hover:bg-gray-800 transition"
        >
          Translate Document
        </button>
        <ProgressLoader progress={progress} />
      </main>
      <InspirationSection />
      <Footer />
    </div>
  );
}
