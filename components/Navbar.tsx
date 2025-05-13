const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-text">TranslateAI</h1>
        <ul className="flex space-x-6 text-subtle text-sm">
          <li><a href="/about" className="text-sm text-subtle hover:text-black">About</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

