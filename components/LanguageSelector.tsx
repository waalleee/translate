
const LanguageSelector = () => (
  <div className="flex gap-4 my-6">
    <select className="border rounded-md p-2 w-full">
      <option>Detect Language</option>
      <option>English</option>
      <option>Swedish</option>
      <option>Spanish</option>
    </select>
    <select className="border rounded-md p-2 w-full">
      <option>English</option>
      <option>Swedish</option>
      <option>Spanish</option>
    </select>
  </div>
);

export default LanguageSelector;
