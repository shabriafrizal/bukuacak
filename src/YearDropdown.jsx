import { useState, useEffect, useRef } from "react";

const YEARS = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017];

const YearDropdown = ({ selectedYear, onYearChange }) => {
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

  const select = (value) => {
    onYearChange(value);
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-sm min-w-[200px]" ref={dropdownRef}>
      <label className="block mb-2 text-sm text-light1/80">
        Tahun Produksi
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={`Filter tahun, sekarang: ${selectedYear || "semua tahun"}`}
          className="bg-gray-700 border border-gray-300 text-light1 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 text-left flex justify-between items-center"
        >
          <span>{selectedYear || "Semua tahun"}</span>
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
            aria-label="Pilih tahun"
            className="absolute z-20 w-full mt-1 bg-gray-700 border border-gray-300 rounded-lg shadow-lg"
          >
            <div className="max-h-60 overflow-y-auto">
              <button
                type="button"
                role="option"
                aria-selected={!selectedYear}
                className="w-full px-4 py-2 text-sm text-left hover:bg-gray-600 text-light1"
                onClick={() => select("")}
              >
                Semua tahun
              </button>
              {YEARS.map((year) => (
                <button
                  key={year}
                  type="button"
                  role="option"
                  aria-selected={String(year) === selectedYear}
                  className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-600 text-light1 ${
                    String(year) === selectedYear ? "font-semibold" : ""
                  }`}
                  onClick={() => select(year.toString())}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <p className="flex items-center mt-2 text-xs text-light1/60">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 mr-2 shrink-0"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clipRule="evenodd"
          />
        </svg>
        Data yang dimiliki terbatas pada tahun tertentu.
      </p>
    </div>
  );
};

export default YearDropdown;
