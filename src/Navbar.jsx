import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const links = [
  { to: "/acak", label: "Acak" },
  { to: "/buku", label: "Buku" },
  { to: "/tentang", label: "Tentang" },
  { to: "/api", label: "API" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu after navigating to another page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 w-full flex flex-wrap sm:justify-start sm:flex-nowrap text-sm p-5 bg-primary shadow-md z-30">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center text-lg font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-light2 rounded"
          >
            <img src="/bukuacak_w.png" alt="" className="h-6 w-auto mr-2" />
            <span className="ml-2 text-lg font-semibold text-light1">
              Bukuacak
            </span>
          </Link>
          <div className="sm:hidden">
            <button
              type="button"
              className="relative size-7 flex justify-center items-center gap-x-2 rounded-lg border border-light2/50 bg-primary text-gray-800 shadow-sm hover:bg-secondary focus:outline-none focus:bg-secondary"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label="Menu navigasi"
              aria-expanded={isMenuOpen}
              aria-controls="primary-navigation"
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
                  aria-hidden="true"
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
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          id="primary-navigation"
          className={`${
            isMenuOpen ? "block" : "hidden"
          } sm:block transition-all duration-300 basis-full grow`}
        >
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-light2 rounded ${
                    isActive
                      ? "text-light1"
                      : "text-light1/60 hover:text-light1/80"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
