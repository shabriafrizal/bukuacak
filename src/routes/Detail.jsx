import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import BookDetail from "../BookDetail";
import { ApiError, fetchJson } from "../config/api";
import Seo from "../Seo";

const EMPTY_BOOK = {
  id: "",
  title: "",
  author: "",
  genre: "",
  publisher: "",
  cover: "",
  store: "",
  textStore: "",
  description: "",
  published_date: "",
  total_pages: "",
  isbn: "",
  size: "",
  format: "",
  price: "",
  book_link: false,
};

// The API stores "0" for unknown detail values (e.g. ISBN).
const detailValue = (value, fallback = "Tidak tersedia") =>
  value && value !== "0" ? value : fallback;

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();  const [isLoading, setIsLoading] = useState(true);
  const [book, setBook] = useState(EMPTY_BOOK);
  const [errorTitle, setErrorTitle] = useState("Buku tidak ditemukan");
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    const fetchBookDetail = async () => {
      try {
        const data = await fetchJson(`book/${encodeURIComponent(id)}`, {
          signal: controller.signal,
        });

        setBook({
          id: data._id,
          title: data.title || "Tanpa judul",
          author: data.author?.name || "Penulis tidak diketahui",
          description: data.summary || "Belum ada deskripsi untuk buku ini.",
          genre: data.category?.name || "Tidak ada genre",
          publisher: data.publisher || "Penerbit tidak diketahui",
          cover: data.cover_image || "/bukuacak_w.png",
          textStore: data.buy_links?.[0]?.store || "Cari di toko online",
          store: data.buy_links?.[0]?.url || "",
          isbn: detailValue(data.details?.isbn),
          size: detailValue(data.details?.size),
          format: detailValue(data.details?.format),
          price: detailValue(data.details?.price, "Harga tidak tersedia"),
          total_pages: detailValue(data.details?.total_pages),
          book_link: data.book_link || false,
          published_date: detailValue(data.details?.published_date),
        });
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Error fetching book:", err);
        if (err instanceof ApiError && err.status === 404) {
          setErrorTitle("Buku tidak ditemukan");
          setError("Buku yang kamu cari tidak ditemukan.");
        } else if (err instanceof ApiError && err.status) {
          setErrorTitle("Gagal memuat buku");
          setError(err.message);
        } else {
          setErrorTitle("Buku tidak ditemukan");
          setError(
            "Buku tidak ditemukan, atau server Bukuacak sedang tidak dapat dihubungi."
          );
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    if (id) {
      fetchBookDetail();
    } else {
      setIsLoading(false);
      setErrorTitle("Buku tidak ditemukan");
      setError("Buku yang kamu cari tidak ditemukan.");
    }

    return () => controller.abort();
  }, [id]);

  if (isLoading) {
    return (
      <section className="container mx-auto p-5 mt-20">
        <div className="max-w-4xl mx-auto" aria-busy="true">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
          <div className="w-full h-[1px] mt-8 mb-8 bg-gray-700"></div>
          <div className="h-96 bg-gray-700 rounded"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto p-5 mt-20">
        <Seo
          title="Buku tidak ditemukan"
          description="Buku yang kamu cari tidak ditemukan di Bukuacak."
          path={`/buku/${id || ""}`}
          noindex
        />
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-semibold text-3xl mb-2">{errorTitle}</h1>
          <p className="font-light text-light1/50 mb-6">{error}</p>
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-light1 text-black rounded-lg hover:bg-bluesea hover:text-light1 transition-colors"
            >
              Kembali
            </button>
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

  return (
    <section className="container mx-auto p-5 mt-20">
      <Seo
        title={book.title}
        description={book.description.slice(0, 155)}
        path={`/buku/${book.id}`}
        type="article"
        keywords={[book.title, book.author, book.genre].filter(Boolean)}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Book",
          name: book.title,
          author: { "@type": "Person", name: book.author },
          image: book.cover,
          description: book.description,
          genre: book.genre,
          publisher: book.publisher,
        }}
      />
      <div>
        <div className="max-w-4xl mx-auto">
          <h1 className="font-semibold text-3xl mb-2">{book.title}</h1>
          <p className="font-light text-light1/50 text-xl">{book.author}</p>
        </div>
        <div className="w-full h-[1px] mt-8 mb-8 bg-light1/5"></div>
        <BookDetail
          cover={book.cover}
          title={book.title}
          description={book.description}
          genre={book.genre}
          storeLink={book.store}
          textStore={book.textStore}
          isbn={book.isbn}
          published_date={book.published_date}
          size={book.size}
          format={book.format}
          publisher={book.publisher}
          price={book.price}
          total_pages={book.total_pages}
          book_link={book.book_link}
        />
        <div className="w-full h-[1px] mt-8 mb-8 bg-light1/5"></div>
      </div>
    </section>
  );
}

export default Detail;
