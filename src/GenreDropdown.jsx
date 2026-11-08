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

    const handleEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Ensure genres is always an array
  const genreList = Array.isArray(genres) ? genres : [];

  // Filter genres based on search term
  const filteredGenres = genreList.filter((g) =>
    (typeof g === "string" ? g.toLowerCase() : g.genre?.toLowerCase() || "")
      .includes(searchTerm.toLowerCase())
  );

  const getGenreDisplay = (genre) => {
    if (typeof genre === "string") return genre;
    return genre.genre || "";
  };

  const getGenreCount = (genre) => {
    if (typeof genre === "string") return null;
    return genre.count;
  };

  const select = (value) => {
    onGenreChange(value);
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-sm min-w-[200px]" ref={dropdownRef}>
      <label className="block mb-2 text-sm text-light1/80">Genre</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={`Filter genre, sekarang: ${selectedGenre || "semua genre"}`}
          className="bg-gray-700 border border-gray-300 text-light1 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 text-left flex justify-between items-center"
        >
          <span className="truncate">{selectedGenre || "Semua genre"}</span>
          <svg
            className={`w-4 h-4 shrink-0 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
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
          <div
            role="listbox"
            aria-label="Pilih genre"
            className="absolute z-20 w-full mt-1 bg-gray-700 border border-gray-300 rounded-lg shadow-lg"
          >
            <div className="p-2">
              <input
                type="text"
                placeholder="Cari genre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Cari genre"
                className="w-full p-2.5 text-sm text-light1 bg-dark2/60 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder:text-light1/40"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="max-h-60 overflow-y-auto">
              <button
                type="button"
                role="option"
                aria-selected={!selectedGenre}
                className="w-full px-4 py-2 text-sm text-left hover:bg-gray-600 text-light1"
                onClick={() => select("")}
              >
                Semua genre
              </button>
              {filteredGenres.length === 0 && (
                <p className="px-4 py-2 text-sm text-light1/50">
                  Genre tidak ditemukan.
                </p>
              )}
              {filteredGenres.map((genre, index) => {
                const displayText = getGenreDisplay(genre);
                const count = getGenreCount(genre);
                return (
                  <button
                    key={`${displayText}-${index}`}
                    type="button"
                    role="option"
                    aria-selected={displayText === selectedGenre}
                    className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-600 text-light1 ${
                      displayText === selectedGenre ? "font-semibold" : ""
                    }`}
                    onClick={() => select(displayText)}
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
