import { useState, useEffect } from "react";
import TextAnimator from "../TextAnimator";
import BookAcakDetail from "../BookAcakDetail";
import YearDropdown from "../YearDropdown";
import GenreDropdown from "../GenreDropdown";
import TextInput from "../TextInput";

function Acak() {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedKeyword, setSelectedKeyword] = useState("");
  const [genres, setGenres] = useState([]);
  const [isVisibleBookPage, setIsVisibleBookPage] = useState(false);
  const [description, setDescription] = useState(
    "Tekan tombol diatas untuk mendapatkan Deskripsi Buku secara acak!"
  );
  const [coverlink, setCoverlink] = useState(false);
  const [id, setId] = useState(false);
  const [title, setTitle] = useState(false);
  const [author, setAuthor] = useState(false);
  const [store, setStore] = useState(false);
  const [textStore, setTextStore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [blurTrigger, setBlurTrigger] = useState(false);
  const [genre, setGenre] = useState(false);

  // Fetch genres when component mounts
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          "https://bukuacak-9bdcb4ef2605.herokuapp.com/stats/genre"
        );
        const data = await response.json();
        setGenres(data.genre_statistics);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  const fetchRandomBook = async () => {
    setIsLoading(true);
    setBlurTrigger((prev) => !prev);

    try {
      let url = "https://bukuacak-9bdcb4ef2605.herokuapp.com/random_book";
      const params = new URLSearchParams();

      if (selectedKeyword) params.append("keyword", selectedKeyword);
      if (selectedGenre) params.append("genre", selectedGenre);
      if (selectedYear) params.append("year", selectedYear);

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.message) {
        setIsVisibleBookPage(false);
      } else {
        setIsVisibleBookPage(true);
      }

      // Updated property mapping to match your API response
      setId(data._id || "404");
      setDescription(data.summary || data.message);
      setTextStore(data.buy_links?.[0]?.store || "Check Online!");
      setGenre(data.category?.name || "Unknown Genre");
      setCoverlink(data.cover_image || "");
      setTitle(data.title || "");
      setAuthor(data.author?.name || "Unknown Author");
      // Handle the case where buy_links is an array
      setStore(data.buy_links?.[0]?.url || "");
    } catch (error) {
      console.error("Error fetching book:", error);
      setDescription("Oops! Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="container mx-auto p-5 mt-20">
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
        <div className="flex justify-center mt-2">
          <button
            onClick={fetchRandomBook}
            disabled={isLoading}
            className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-light1 rounded-lg hover:bg-bluesea group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="w-48 h-48 rounded rotate-[-40deg] bg-bluesea absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span className="relative min-w-[250px] md:min-w-[650px] lg:min-w-[800px] text-black transition-colors duration-300 ease-in-out group-hover:text-light1">
              {isLoading ? "Loading..." : "Acak Buku"}
            </span>
          </button>
        </div>
      </div>
      <div className="w-full h-[1px] mt-8 mb-8 bg-light1/5"></div>
      <div className="min-h-[100px]">
        <TextAnimator
          key={id} // Force re-render when description changes
          text={description}
          speed={25}
          maxWidth="4xl"
          lineHeight="relaxed"
          justify={true}
        />
      </div>
      {isVisibleBookPage && (
        <div>
          <div className="w-full h-[1px] mt-8 mb-8 bg-light1/5"></div>
          <BookAcakDetail
            id={id}
            cover={coverlink}
            title={title}
            author={author}
            description={description}
            genre={genre}
            storeLink={store}
            isLoading={isLoading}
            blurTrigger={blurTrigger}
            textStore={textStore}
          />
          <div className="w-full h-[1px] mt-8 mb-8 bg-light1/5"></div>
          <div className="flex justify-center mt-2">
            <button
              onClick={fetchRandomBook}
              disabled={isLoading}
              className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-light1 rounded-lg hover:bg-bluesea group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="w-48 h-48 rounded rotate-[-40deg] bg-bluesea absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="relative min-w-[250px] md:min-w-[650px] lg:min-w-[800px] text-black transition-colors duration-300 ease-in-out group-hover:text-light1">
                {isLoading ? "Loading..." : "Acak Buku"}
              </span>
            </button>
          </div>
          <div className="w-full h-[1px] mt-8 mb-8 bg-light1/5"></div>
        </div>
      )}
    </section>
  );
}

export default Acak;
