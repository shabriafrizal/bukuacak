import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BookDetail from "../BookDetail";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [book, setBook] = useState({
    id: "",
    title: "",
    author: "",
    genre: "",
    cover: "",
    store: "",
    textStore: "",
    description: "",
    published_date: "",
    total_page: "",
    isbn: "",
    size: "",
    format: "",
    price: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetail = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const url = `https://bukuacak-9bdcb4ef2605.herokuapp.com/book/${id}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Book not found");
        }

        const data = await response.json();

        setBook({
          id: data._id,
          title: data.title || "",
          author: data.author?.name || "Author tidak diketahui",
          description: data.summary || "Tidak ada deskripsi",
          genre: data.category?.name || "Tidak ada genre",
          cover: data.cover_image || "/bukuacak.png",
          textStore: data.buy_links?.[0]?.store || "Check Online",
          store: data.buy_links?.[0]?.url || "#",
          isbn: data.details?.isbn || "ISBN tidak ditemukan",
          size: data.details?.size || "Ukuran tidak diketahui",
          format: data.details?.format || "Format tidak diketahui",
          price: data.details?.price || "Harga tidak diketahui",
          total_pages: data.details?.total_pages || "Jumlah tidak diketahui",
          published_date:
            data.details?.published_date || "Tanggal tidak diketahui",
        });
      } catch (error) {
        console.error("Error fetching book:", error);
        setError(error.message);
        // Optionally navigate to an error page or show an error message
        // navigate('/error');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchBookDetail();
    }
  }, [id, navigate]);

  if (isLoading) {
    return (
      <section className="container mx-auto p-5 mt-20">
        <div className="max-w-4xl mx-auto">
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
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-semibold text-3xl mb-2">Error</h1>
          <p className="font-light text-light1/50">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-light1 text-black rounded hover:bg-bluesea hover:text-light1 transition-colors"
          >
            Go Back
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto p-5 mt-20">
      <div>
        <div className="max-w-4xl mx-auto">
          <h1 className="font-semibold text-3xl mb-2">{book.title}</h1>
          <p className="font-light text-light1/50 text-xl">{book.author}</p>
        </div>
        <div className="w-full h-[1px] mt-8 mb-8 bg-light1/5"></div>
        <BookDetail
          cover={book.cover}
          description={book.description}
          genre={book.genre}
          storeLink={book.store}
          textStore={book.textStore}
          isbn={book.isbn}
          published_date={book.published_date}
          size={book.size}
          format={book.format}
          price={book.price}
          total_pages={book.total_pages}
        />
        <div className="w-full h-[1px] mt-8 mb-8 bg-light1/5"></div>
      </div>
    </section>
  );
}

export default Detail;
