import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-light1/5 bg-primary/40 text-sm">
      <div className="max-w-[85rem] mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-light1/50">
        <p>
          © {new Date().getFullYear()} Bukuacak. Hak cipta dilindungi.
        </p>
        <div className="flex items-center gap-4">
          <Link to="/tentang" className="hover:text-light1 transition-colors">
            Tentang
          </Link>
          <Link to="/api" className="hover:text-light1 transition-colors">
            API
          </Link>
          <a
            href="https://github.com/shabriafrizal/bukuacak"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-light1 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
