import { useState, useEffect, useRef } from "react";

const SORTS = [
  { value: "newest", label: "Terbaru" },
  { value: "oldest", label: "Terlama" },
  { value: "titleAZ", label: "A ke Z" },
  { value: "titleZA", label: "Z ke A" },
  { value: "priceLowHigh", label: "Termurah" },
  { value: "priceHighLow", label: "Termahal" },
];

const SortDropdown = ({ selectedSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const selectedLabel =
    SORTS.find((sort) => sort.value === selectedSort)?.label || SORTS[0].label;

  return (
    <div className="w-full max-w-[200px]" ref={dropdownRef}>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={`Urutkan buku, sekarang: ${selectedLabel}`}
          className="bg-gray-700 border border-gray-300 text-light1 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 text-left flex justify-between items-center"
        >
          <span>{selectedLabel}</span>
          <svg
            className={`w-4 h-4 transition-transform ${
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
            aria-label="Urutkan buku"
            className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-300 rounded-lg shadow-lg dark:bg-gray-700 dark:border-gray-600"
          >
            <div className="max-h-60 overflow-y-auto">
              {SORTS.map((sort) => (
                <button
                  key={sort.value}
                  type="button"
                  role="option"
                  aria-selected={sort.value === selectedSort}
                  className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white ${
                    sort.value === selectedSort ? "font-semibold" : ""
                  }`}
                  onClick={() => {
                    onSortChange(sort.value);
                    setIsOpen(false);
                  }}
                >
                  {sort.label}
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
