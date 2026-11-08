import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import GenreDropdown from "../GenreDropdown";
import YearDropdown from "../YearDropdown";
import TextInput from "../TextInput";
import Pagination from "../Pagination";
import BookGrid from "../BookGrid";
import LoadingGrid from "../LoadingGrid";
import SortDropdown from "../SortDropdown";
import { fetchJson } from "../config/api";
import Seo from "../Seo";

const DEFAULT_PAGINATION = {
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 20,
  hasNextPage: false,
  hasPrevPage: false,
};

function Buku() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [genres, setGenres] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [paginationInfo, setPaginationInfo] = useState(DEFAULT_PAGINATION);

  // Get current filter values from URL parameters
  const currentSort = searchParams.get("sort") || "newest";
  const currentYear = searchParams.get("year") || "";
  const currentKeyword = searchParams.get("keyword") || "";
  const currentGenre = searchParams.get("genre") || "";
  const hasActiveFilters = Boolean(
    currentYear || currentKeyword || currentGenre || searchParams.has("sort")
  );

  // Update URL parameters
  const updateSearchParams = (params) => {
    const newSearchParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    });
    // Always reset to page 1 when filters change
    if (!Object.prototype.hasOwnProperty.call(params, "page")) {
      newSearchParams.set("page", "1");
    }
    setSearchParams(newSearchParams);
  };

  const handleYearChange = (value) => updateSearchParams({ year: value });
  const handleGenreChange = (value) => updateSearchParams({ genre: value });
  const handleKeywordChange = (value) => updateSearchParams({ keyword: value });
  const handleSortChange = (value) => updateSearchParams({ sort: value });
  const handlePageChange = (newPage) =>
    updateSearchParams({ page: newPage.toString() });

  const resetFilters = () => {
    setSearchParams(new URLSearchParams({ page: "1" }));
  };

  // Fetch genres when component mounts
  useEffect(() => {
    const controller = new AbortController();

    fetchJson("stats/genre", { signal: controller.signal })
      .then((data) => {
        setGenres(Array.isArray(data?.genre_statistics) ? data.genre_statistics : []);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          // The filter still works without the list, so this is not fatal.
          console.error("Error fetching genres:", err);
        }
      });

    return () => controller.abort();
  }, [reloadKey]);

  // Fetch books whenever the URL parameters change
  useEffect(() => {
    const controller = new AbortController();

    const fetchBooks = async () => {
      setIsLoading(true);
      setError("");

      try {
        const data = await fetchJson("book", {
          query: searchParams,
          signal: controller.signal,
        });

        const nextBooks = Array.isArray(data?.books) ? data.books : [];
        const nextPagination = { ...DEFAULT_PAGINATION, ...data?.pagination };
        const requestedPage = Number(searchParams.get("page") || 1);

        // If the requested page is past the end (e.g. after the data shrank),
        // jump back to the last real page instead of showing an empty grid.
        if (
          nextBooks.length === 0 &&
          nextPagination.totalPages > 0 &&
          requestedPage > nextPagination.totalPages
        ) {
          const corrected = new URLSearchParams(searchParams);
          corrected.set("page", String(nextPagination.totalPages));
          setSearchParams(corrected);
          return;
        }

        setBooks(
          nextBooks.map((book) => ({
            id: book._id,
            cover: book.cover_image,
            title: book.title,
            author: book.author?.name || "Penulis tidak diketahui",
          }))
        );
        setPaginationInfo(nextPagination);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Error fetching books:", err);
        setBooks([]);
        setPaginationInfo(DEFAULT_PAGINATION);
        setError(err.message || "Gagal memuat daftar buku.");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    fetchBooks();

    return () => controller.abort();
  }, [searchParams, reloadKey, setSearchParams]);

  // Function to calculate the range of items being displayed
  const getDisplayRange = () => {
    const start =
      (paginationInfo.currentPage - 1) * paginationInfo.itemsPerPage + 1;
    const end = Math.min(
      paginationInfo.currentPage * paginationInfo.itemsPerPage,
      paginationInfo.totalItems
    );
    return `Menampilkan ${start}-${end} buku dari ${paginationInfo.totalItems.toLocaleString("id-ID")} buku`;
  };

  return (
    <section className="container mx-auto p-5 mt-20">
      <Seo
        title="Koleksi Buku"
        description="Jelajahi koleksi buku di Bukuacak dengan filter genre, tahun, kata kunci, dan pengurutan yang fleksibel."
        path="/buku"
        keywords={["koleksi buku", "daftar buku", "filter buku", "buku indonesia"]}
      />
      <div>
        <div className="rounded-lg max-w-4xl mx-auto">
          <h1 className="font-semibold text-3xl mb-2">Koleksi Buku</h1>
          <p className="font-light text-light1/50">
            Koleksi Buku yang bisa Kamu cari tahu!
          </p>
        </div>

        <div className="w-full h-[1px] mt-8 bg-light1/5"></div>
        <div className="flex justify-center mt-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 mx-auto max-w-4xl">
            <YearDropdown
              selectedYear={currentYear}
              onYearChange={handleYearChange}
            />
            <GenreDropdown
              genres={genres}
              selectedGenre={currentGenre}
              onGenreChange={handleGenreChange}
            />
            <TextInput
              label="Kata Kunci"
              value={currentKeyword}
              setValue={handleKeywordChange}
              placeholder="Cth: Strategi Bisnis ..."
            />
          </div>
        </div>
        <div className="w-full h-[1px] mt-8 mb-8 bg-light1/5"></div>

        {/* Display count information when books are loaded */}
        {!loading && !error && books.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 max-w-5xl mx-auto px-5">
            <SortDropdown
              selectedSort={currentSort}
              onSortChange={handleSortChange}
            />
            <div className="text-left sm:text-right text-light1/50 mt-1 sm:ml-4">
              {getDisplayRange()}
            </div>
          </div>
        )}

        {/* Something went wrong: the API is unreachable or replied with an error */}
        {!loading && error && (
          <div
            role="alert"
            className="max-w-5xl mx-auto px-5 my-8 rounded-lg border border-red-500/30 bg-red-500/10 p-6 text-center"
          >
            <p className="text-light1 font-medium mb-1">Gagal memuat buku</p>
            <p className="text-light1/60 text-sm mb-4">{error}</p>
            <button
              type="button"
              onClick={() => setReloadKey((key) => key + 1)}
              className="px-4 py-2 rounded-lg bg-light1 text-black hover:bg-bluesea hover:text-light1 transition-colors"
            >
              Coba lagi
            </button>
          </div>
        )}

        {/* Display message when no books are found */}
        {!loading && !error && books.length === 0 && (
          <div className="text-center text-light1/50 my-8">
            <p>Tidak ada buku yang ditemukan dengan filter yang dipilih.</p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 px-4 py-2 rounded-lg bg-light1/10 hover:bg-light1/20 transition-colors text-light1"
              >
                Hapus semua filter
              </button>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4 mx-auto max-w-5xl">
          {loading ? (
            <LoadingGrid />
          ) : (
            books.map((book) => <BookGrid key={book.id} {...book} />)
          )}
        </div>
        {/* Show pagination only when there are books and more than one page */}
        {!loading &&
          !error &&
          books.length > 0 &&
          paginationInfo.totalPages > 1 && (
            <Pagination
              currentPage={paginationInfo.currentPage}
              totalPages={paginationInfo.totalPages}
              onPageChange={handlePageChange}
            />
          )}

        <div className="w-full h-[1px] mt-8 mb-8 bg-light1/5"></div>
      </div>
    </section>
  );
}

export default Buku;
