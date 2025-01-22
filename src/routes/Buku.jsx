import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import GenreDropdown from "../GenreDropdown";
import YearDropdown from "../YearDropdown";
import TextInput from "../TextInput";
import Pagination from "../Pagination";
import BookGrid from "../BookGrid";
import LoadingGrid from "../LoadingGrid";
import SortDropdown from "../SortDropdown";

function Buku() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [genres, setGenres] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [paginationInfo, setPaginationInfo] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // Get current filter values from URL parameters
  const currentPage = searchParams.get("page") || "1";
  const currentSort = searchParams.get("sort") || "newest";
  const currentYear = searchParams.get("year") || "";
  const currentKeyword = searchParams.get("keyword") || "";
  const currentGenre = searchParams.get("genre") || "";

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
    if (!params.hasOwnProperty("page")) {
      newSearchParams.set("page", "1");
    }
    setSearchParams(newSearchParams);
  };

  // Handle filter changes
  const handleYearChange = (value) => {
    updateSearchParams({ year: value });
  };

  const handleGenreChange = (value) => {
    updateSearchParams({ genre: value });
  };

  const handleKeywordChange = (value) => {
    updateSearchParams({ keyword: value });
  };

  const handleSortChange = (value) => {
    updateSearchParams({ sort: value });
  };

  const handlePageChange = (newPage) => {
    updateSearchParams({ page: newPage.toString() });
  };

  // Fetch books based on URL parameters
  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const url = new URL(
        "https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/book"
      );

      // Add all search params to URL
      searchParams.forEach((value, key) => {
        if (value) url.searchParams.append(key, value);
      });

      const response = await fetch(url);
      const data = await response.json();

      // Handle empty page scenario
      if (data.books.length === 0 && data.pagination.totalPages > 0) {
        if (parseInt(currentPage) > data.pagination.totalPages) {
          handlePageChange(data.pagination.totalPages);
          return;
        }
      }

      // Transform the books data to match BookGrid component props
      const transformedBooks = data.books.map((book) => ({
        id: book._id,
        cover: book.cover_image,
        title: book.title,
        author: book.author.name,
      }));

      setBooks(transformedBooks);
      setPaginationInfo(data.pagination);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch genres when component mounts
  const fetchGenres = async () => {
    try {
      const response = await fetch(
        "https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/stats/genre"
      );
      const data = await response.json();
      setGenres(data.genre_statistics);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  // Effect to fetch books when URL parameters change
  useEffect(() => {
    fetchBooks();
  }, [searchParams]);

  // Effect to fetch genres on mount
  useEffect(() => {
    fetchGenres();
  }, []);

  // Function to calculate the range of items being displayed
  const getDisplayRange = () => {
    const start =
      (paginationInfo.currentPage - 1) * paginationInfo.itemsPerPage + 1;
    const end = Math.min(
      paginationInfo.currentPage * paginationInfo.itemsPerPage,
      paginationInfo.totalItems
    );
    return `Menampilkan ${start}-${end} buku dari ${paginationInfo.totalItems.toLocaleString()} buku`;
  };

  return (
    <section className="container mx-auto p-5 mt-20">
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
        {!loading && books.length > 0 && (
          <div className="grid grid-cols-2 mb-4 max-w-5xl mx-auto px-5">
            <SortDropdown
              selectedSort={currentSort}
              onSortChange={handleSortChange}
            />
            <div className="text-right text-light1/50 mt-1 ml-4">
              {getDisplayRange()}
            </div>
          </div>
        )}

        {/* Display message when no books are found */}
        {!loading && books.length === 0 && (
          <div className="text-center text-light1/50 my-8">
            Tidak ada buku yang ditemukan dengan filter yang dipilih.
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
        {!loading && books.length > 0 && paginationInfo.totalPages > 1 && (
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
