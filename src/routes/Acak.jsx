import { useState, useEffect, useRef } from "react";
import TextAnimator from "../TextAnimator";
import BookAcakDetail from "../BookAcakDetail";
import YearDropdown from "../YearDropdown";
import GenreDropdown from "../GenreDropdown";
import TextInput from "../TextInput";
import { ApiError, fetchJson } from "../config/api";
import Seo from "../Seo";

const DEFAULT_DESCRIPTION =
  "Tekan tombol di atas untuk mendapatkan buku secara acak!";

function Acak() {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedKeyword, setSelectedKeyword] = useState("");
  const [genres, setGenres] = useState([]);
  const [book, setBook] = useState(null);
  const [description, setDescription] = useState(DEFAULT_DESCRIPTION);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [blurTrigger, setBlurTrigger] = useState(false);
  const requestRef = useRef(null);

  // Fetch genres when component mounts
  useEffect(() => {
    const controller = new AbortController();

    fetchJson("stats/genre", { signal: controller.signal })
      .then((data) => {
        setGenres(
          Array.isArray(data?.genre_statistics) ? data.genre_statistics : []
        );
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          // Filters still work without the genre list.
          console.error("Error fetching genres:", error);
        }
      });

    return () => controller.abort();
  }, []);

  // Cancel an in-flight request when the page unmounts
  useEffect(() => () => requestRef.current?.abort(), []);

  const fetchRandomBook = async () => {
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;

    setIsLoading(true);
    setHasError(false);
    setBlurTrigger((prev) => !prev);

    try {
      const data = await fetchJson("random_book", {
        query: {
          keyword: selectedKeyword,
          genre: selectedGenre,
          year: selectedYear,
        },
        signal: controller.signal,
        cache: "no-store",
      });

      if (!data?._id) {
        setBook(null);
        setDescription(
          "Tidak ada buku yang cocok dengan filter tersebut. Coba longgarkan filternya."
        );
        return;
      }

      setBook({
        id: data._id,
        title: data.title || "Tanpa judul",
        author: data.author?.name || "Penulis tidak diketahui",
        genre: data.category?.name || "Genre tidak diketahui",
        cover: data.cover_image || "/bukuacak_w.png",
        description: data.summary || "Belum ada deskripsi untuk buku ini.",
        store: data.buy_links?.[0]?.url || "",
        textStore: data.buy_links?.[0]?.store || "Cari di toko online",
      });
      setDescription(data.summary || "Belum ada deskripsi untuk buku ini.");
    } catch (error) {
      if (error.name === "AbortError") return;

      console.error("Error fetching random book:", error);
      setBook(null);
      setHasError(true);

      if (error instanceof ApiError && error.status && error.status !== 404) {
        setDescription(
          error.message || "Oops! Terjadi kesalahan. Silakan coba lagi."
        );
      } else {
        // The API answers 404 (without CORS headers, so browsers report it as a
        // network error) when nothing matches the filters.
        setDescription(
          "Tidak ada buku yang cocok dengan filter tersebut, atau server Bukuacak sedang tidak bisa dihubungi. Coba longgarkan filternya."
        );
      }
    } finally {
      if (!controller.signal.aborted) setIsLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const resetFilters = () => {
    setSelectedYear("");
    setSelectedGenre("");
    setSelectedKeyword("");
  };

  const hasFilters = Boolean(selectedYear || selectedGenre || selectedKeyword);

  return (
    <section className="container mx-auto p-5 mt-20">
      <Seo
        title="Buku Acak"
        description="Dapatkan rekomendasi buku secara acak sesuai genre, tahun, atau kata kunci pilihanmu."
        path="/acak"
        keywords={["rekomendasi buku", "buku acak", "cari buku"]}
      />
      <div>
        <div className="rounded-lg max-w-4xl mx-auto">
          <h1 className="font-semibold text-3xl mb-2">Buku Acak</h1>
          <p className="font-light text-light1/50">
            Dapatkan Rekomendasi Buku Sesuai Dengan Kategori yang Kamu mau!
          </p>
        </div>
        <div className="w-full h-[1px] mt-8 bg-light1/5"></div>
        <div className="flex justify-center mt-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 mx-auto max-w-4xl">
            <YearDropdown
              selectedYear={selectedYear}
              onYearChange={setSelectedYear}
            />
            <GenreDropdown
              genres={genres}
              selectedGenre={selectedGenre}
              onGenreChange={setSelectedGenre}
            />
            <TextInput
              label="Kata Kunci"
              value={selectedKeyword}
              setValue={setSelectedKeyword}
              placeholder="Cth: Strategi Bisnis ..."
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 mt-2">
          <button
            type="button"
            onClick={fetchRandomBook}
            disabled={isLoading}
            aria-live="polite"
            className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-light1 rounded-lg hover:bg-bluesea group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="w-48 h-48 rounded rotate-[-40deg] bg-bluesea absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span className="relative min-w-[250px] md:min-w-[650px] lg:min-w-[800px] text-black transition-colors duration-300 ease-in-out group-hover:text-light1">
              {isLoading ? "Mencari buku..." : "Acak Buku"}
            </span>
          </button>
          {hasFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs text-light1/50 hover:text-light1 underline underline-offset-4 transition-colors"
            >
              Hapus filter
            </button>
          )}
        </div>
      </div>
      <div className="w-full h-[1px] mt-8 mb-8 bg-light1/5"></div>
      <div className="min-h-[100px]">
        <TextAnimator
          key={`${book?.id || "empty"}-${description}`}
          text={description}
          speed={25}
          maxWidth="4xl"
          lineHeight="relaxed"
          justify={true}
        />
      </div>
      {book && (
        <div>
          <div className="w-full h-[1px] mt-8 mb-8 bg-light1/5"></div>
          <BookAcakDetail
            id={book.id}
            cover={book.cover}
            title={book.title}
            author={book.author}
            description={book.description}
            genre={book.genre}
            storeLink={book.store}
            isLoading={isLoading}
            blurTrigger={blurTrigger}
            textStore={book.textStore}
          />
          <div className="w-full h-[1px] mt-8 mb-8 bg-light1/5"></div>
          <div className="flex justify-center mt-2">
            <button
              type="button"
              onClick={fetchRandomBook}
              disabled={isLoading}
              className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-light1 rounded-lg hover:bg-bluesea group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="w-48 h-48 rounded rotate-[-40deg] bg-bluesea absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="relative min-w-[250px] md:min-w-[650px] lg:min-w-[800px] text-black transition-colors duration-300 ease-in-out group-hover:text-light1">
                {isLoading ? "Mencari buku..." : "Acak Buku Lagi"}
              </span>
            </button>
          </div>
          <div className="w-full h-[1px] mt-8 mb-8 bg-light1/5"></div>
        </div>
      )}
      {!book && hasError && (
        <div role="alert" className="text-center mt-4">
          <button
            type="button"
            onClick={fetchRandomBook}
            className="px-4 py-2 rounded-lg bg-light1 text-black hover:bg-bluesea hover:text-light1 transition-colors"
          >
            Coba lagi
          </button>
        </div>
      )}
    </section>
  );
}

export default Acak;
