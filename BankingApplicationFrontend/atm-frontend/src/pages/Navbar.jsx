import React from "react";

function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-inherit">
      <h1 className="text-xl font-bold">ATM App</h1>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="bg-gray-300 dark:bg-gray-700 text-sm px-4 py-2 rounded transition-all"
      >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>
    </nav>
  );
}

export default Navbar;
