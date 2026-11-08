import { Link } from "react-router-dom";
import Seo from "../Seo";

function NotFound() {
  return (
    <section className="container mx-auto p-5 mt-20">
      <Seo
        title="Halaman tidak ditemukan"
        description="Halaman yang kamu cari tidak ada di Bukuacak."
        path="/404"
        noindex
      />
      <div className="max-w-4xl mx-auto text-center py-16">
        <p className="text-6xl font-bold text-light1/20 mb-4">404</p>
        <h1 className="font-semibold text-3xl mb-2">
          Halaman tidak ditemukan
        </h1>
        <p className="font-light text-light1/50 mb-8">
          Sepertinya halaman yang kamu cari sudah dipindahkan atau tidak pernah
          ada.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            to="/"
            className="px-4 py-2 bg-light1 text-black rounded-lg hover:bg-bluesea hover:text-light1 transition-colors"
          >
            Kembali ke Buku Acak
          </Link>
          <Link
            to="/buku"
            className="px-4 py-2 bg-light1/10 text-light1 rounded-lg hover:bg-light1/20 transition-colors"
          >
            Lihat semua buku
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
