const languages = [
  "Detect Language",
  "Swedish", "English", "Spanish", "French", "German", "Italian", "Dutch",
  "Norwegian", "Danish", "Finnish", "Polish", "Russian", "Ukrainian",
  "Chinese (Simplified)", "Chinese (Traditional)", "Japanese", "Korean",
  "Arabic", "Turkish", "Hindi", "Bengali", "Portuguese", "Greek", "Czech",
  "Romanian", "Hungarian", "Thai", "Vietnamese", "Hebrew", "Indonesian",
  "Malay", "Filipino", "Slovak", "Croatian", "Bulgarian", "Serbian",
  "Slovenian", "Lithuanian", "Latvian", "Estonian", "Icelandic", "Irish"
];

export default function LanguageSelector() {
  return (
    <div className="flex flex-col md:flex-row gap-4 mt-6">
      <select className="w-full md:w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none max-h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        {languages.map((lang) => (
          <option key={lang}>{lang}</option>
        ))}
      </select>
      <select className="w-full md:w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none max-h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        {languages
          .filter((lang) => lang !== "Detect Language")
          .map((lang) => (
            <option key={lang}>{lang}</option>
          ))}
      </select>
    </div>
  );
}


