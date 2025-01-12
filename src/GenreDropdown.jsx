import { useState, useEffect, useRef } from "react";

const GenreDropdown = ({ genres, selectedGenre, onGenreChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Ensure genres is always an array
  const genreList = Array.isArray(genres) ? genres : [];

  // Filter genres based on search term
  const filteredGenres = genreList.filter((g) =>
    (typeof g === "string"
      ? g.toLowerCase()
      : g.genre?.toLowerCase() || ""
    ).includes(searchTerm.toLowerCase())
  );

  const getGenreDisplay = (genre) => {
    if (typeof genre === "string") return genre;
    return genre.genre || "";
  };

  const getGenreCount = (genre) => {
    if (typeof genre === "string") return null;
    return genre.count;
  };

  return (
    <div className="w-full max-w-sm min-w-[200px]" ref={dropdownRef}>
      <label className="block mb-2 text-sm text-light1/80">Genre</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gray-700 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 text-left flex justify-between items-center dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        >
          <span>{selectedGenre || "Semua genre"}</span>
          <svg
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-300 rounded-lg shadow-lg dark:bg-gray-700 dark:border-gray-600">
            <div className="p-2">
              <input
                type="text"
                placeholder="Cari genre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2.5 text-sm text-dark2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="max-h-60 overflow-y-auto">
              <button
                className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
                onClick={() => {
                  onGenreChange("");
                  setIsOpen(false);
                }}
              >
                Semua genre
              </button>
              {filteredGenres.map((genre, index) => {
                const displayText = getGenreDisplay(genre);
                const count = getGenreCount(genre);
                return (
                  <button
                    key={`${displayText}-${index}`}
                    className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
                    onClick={() => {
                      onGenreChange(displayText);
                      setIsOpen(false);
                    }}
                  >
                    {displayText} {count ? `(${count})` : ""}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenreDropdown;
