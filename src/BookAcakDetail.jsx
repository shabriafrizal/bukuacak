import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookAcakDetail = ({
  id = "",
  cover = "",
  title = "",
  author = "",
  description = "",
  genre = "",
  storeLink = "",
  textStore = "",
  isLoading = false,
  blurTrigger = false, // Add this new prop
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const truncatedDescription = description?.slice(0, 200);
  const shouldTruncate = description?.length > 200;
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate(`/buku/${id}`);
  };

  // Reset blur state when blurTrigger changes
  useEffect(() => {
    setIsRevealed(false);
  }, [blurTrigger]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 mx-auto max-w-4xl animate-pulse">
        <div className="h-[500px] w-full bg-gray-700 rounded-lg"></div>
        <div className="flex flex-col h-full">
          <div className="mb-6 space-y-3">
            <div className="h-6 bg-gray-700 rounded w-1/3"></div>
            <div className="h-8 bg-gray-700 rounded w-3/4"></div>
          </div>
          <div className="flex-grow mb-6 space-y-2">
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded w-2/3"></div>
          </div>
          <div className="mt-auto">
            <div className="h-12 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 p-4 mx-auto max-w-4xl">
      <div
        className={`flex justify-center items-start h-full transition-all duration-300 ${
          !isRevealed ? "blur-lg" : ""
        }`}
      >
        <img
          onClick={handleDetailClick}
          src={cover}
          alt="Book Cover"
          className="cursor-pointer w-3/5 h-auto object-contain object-top"
        />
      </div>

      <div
        className={`flex flex-col h-full transition-all duration-300 ${
          !isRevealed ? "blur-md" : ""
        }`}
      >
        <div className="mb-3">
          <h2 className="text-lg text-light1/50">{author}</h2>
          <h1   className="text-3xl font-bold text-light1">{title}</h1>
        </div>

        <p className="text-light1/50 mb-2">Genre: {genre}</p>
        <div className="flex-grow mb-6">
          <p className="text-light1/25">
            {showFullDescription ? description : truncatedDescription}
            {shouldTruncate && !showFullDescription && "..."}
          </p>
          {shouldTruncate && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-blue-600 hover:text-bluelight mt-2"
            >
              {showFullDescription ? "Show Less" : "Show More"}
            </button>
          )}
        </div>

        <div className="mt-auto">
          <a
            href={storeLink}
            target="_blank"
            className="relative inline-block w-full items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-light1 rounded-lg hover:bg-bluesea group disabled:opacity-50 disabled:cursor-not-allowed text-center"
          >
            <span className="w-48 h-48 rounded rotate-[-40deg] bg-bluesea absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span className="relative w-full text-black transition-colors duration-300 ease-in-out group-hover:text-light1">
              {textStore}
            </span>
          </a>
        </div>
      </div>
      {!isRevealed && (
        <div className="absolute inset-0 bg-dark1/80 flex items-center justify-center rounded-lg z-2 border-2 border-light1/5">
          <button
            onClick={() => setIsRevealed(true)}
            className="px-8 py-3 bg-dark1/70 hover:bg-dark1/80 border border-gray-700 rounded-lg text-white font-normal shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-105 w-1/2"
          >
            Tampilkan Buku
          </button>
        </div>
      )}
    </div>
  );
};

export default BookAcakDetail;
