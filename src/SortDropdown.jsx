import { indexOf } from "lodash";
import { useState, useEffect, useRef } from "react";

const SortDropdown = ({ selectedSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const sorts = [
    "Terbaru",
    "Terlama",
    "A ke Z",
    "Z ke A",
    "Termurah",
    "Termahal",
  ];

  const valueSorts = [
    "newest",
    "oldest",
    "titleAZ",
    "titleZA",
    "priceLowHigh",
    "priceHighLow",
  ];

  return (
    <div className="w-full max-w-[200px]" ref={dropdownRef}>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gray-700 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 text-left flex justify-between items-center dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        >
          <span>{sorts[valueSorts.indexOf(selectedSort)] || "Terbaru"}</span>
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
            <div className="max-h-60 overflow-y-auto">
              {sorts.map((sort, index) => (
                <button
                  key={valueSorts[index]}
                  className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
                  onClick={() => {
                    onSortChange(valueSorts[index]);
                    setIsOpen(false);
                  }}
                >
                  {sort}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;
