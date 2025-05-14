import { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import UploadCard from "../components/UploadCard";
import ProgressLoader from "../components/ProgressLoader";
import AboutSection from "../components/AboutSection";
import Footer from "../components/Footer";
import LanguageSelector from "../components/LanguageSelector";

import { GlobeAltIcon, BoltIcon, DevicePhoneMobileIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [progress, setProgress] = useState(0);

  return (
    <>
      <div className="min-h-screen flex flex-col bg-white text-gray-900">
        <Navbar />
        <HeroSection />

        <main className="w-full max-w-4xl px-4 py-10 space-y-6 mx-auto">
          <UploadCard onProgress={setProgress} />
          <LanguageSelector />
          <ProgressLoader progress={progress} />
        </main>

        <section className="mt-16 mb-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <GlobeAltIcon className="h-10 w-10 text-brand mb-4" />
            <h3 className="font-semibold text-lg mb-2">Global Reach</h3>
            <p className="text-sm text-gray-600">
              Expand your business by making content accessible in multiple languages.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <BoltIcon className="h-10 w-10 text-brand mb-4" />
            <h3 className="font-semibold text-lg mb-2">AI-Powered Speed</h3>
            <p className="text-sm text-gray-600">
              Instantly translate documents with AI precision for fast, reliable results.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <DevicePhoneMobileIcon className="h-10 w-10 text-brand mb-4" />
            <h3 className="font-semibold text-lg mb-2">Seamless Workflow</h3>
            <p className="text-sm text-gray-600">
              Upload, translate, and download your files effortlessly — hassle-free.
            </p>
          </div>
        </section>

        <AboutSection />
        <Footer />
      </div>
    </>
  );
}

