import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full flex flex-wrap sm:justify-start sm:flex-nowrap text-sm p-5 bg-primary shadow-md z-10">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center justify-between">
          <a
            className="flex items-center text-lg font-semibold focus:outline-none focus:opacity-80"
            href="/"
          >
            <img src="/bukuacak_w.png" alt="logo" className="h-6 w-auto mr-2" />
            <span className="ml-2 text-lg font-semibold text-light1">
              Bukuacak
            </span>
          </a>
          <div className="sm:hidden">
            <button
              type="button"
              className="relative size-7 flex justify-center items-center gap-x-2 rounded-lg border border-light2/50 bg-primary text-gray-800 shadow-sm hover:bg-secondary focus:outline-none focus:bg-secondary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation"
            >
              {!isMenuOpen ? (
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8DA9C4"
                >
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
              ) : (
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8DA9C4"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } sm:block transition-all duration-300 basis-full grow`}
        >
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
            <a
              className="font-medium text-light1/60 hover:text-light1/80 focus:outline-none focus:text-light1/100"
              href="/acak"
            >
              Acak
            </a>
            <a
              className="font-medium text-light1/60 hover:text-light1/80 focus:outline-none focus:text-light1/100"
              href="/buku"
            >
              Buku
            </a>
            <a
              className="font-medium text-light1/60 hover:text-light1/80 focus:outline-none focus:text-light1/100"
              href="/tentang"
            >
              Tentang
            </a>
            <a
              className="font-medium text-light1/60 hover:text-light1/80 focus:outline-none focus:text-light1/100"
              href="/api"
            >
              API
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
