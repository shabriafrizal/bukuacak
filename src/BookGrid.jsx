import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FALLBACK_COVER = "/bukuacak_w.png";

const BookGrid = ({ id, cover, title, author }) => {
  const [imageSrc, setImageSrc] = useState(cover || FALLBACK_COVER);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageSrc(cover || FALLBACK_COVER);
    setImageFailed(false);
  }, [cover]);

  const handleImageError = () => {
    if (!imageFailed) {
      setImageFailed(true);
      setImageSrc(FALLBACK_COVER);
    }
  };

  return (
    <Link
      to={`/buku/${id}`}
      data-id={id}
      className="group bg-gray-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg hover:scale-105 focus-visible:scale-105 transform transition-all duration-300 cursor-pointer h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-light2"
    >
      <div className="aspect-[3/4] w-full overflow-hidden flex items-center justify-center">
        <img
          src={imageSrc}
          alt={title ? `Sampul buku ${title}` : "Sampul buku"}
          width="300"
          height="400"
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-contain transition-opacity duration-300 ${
            imageFailed ? "opacity-30 p-8" : ""
          }`}
          onError={handleImageError}
        />
      </div>
      <div className="p-4 flex flex-col justify-center items-center flex-1 min-h-[80px]">
        <h3 className="text-sm font-bold text-white text-center mb-1 line-clamp-2">
          {title}
        </h3>
        <p className="text-xs text-gray-400 text-center">{author}</p>
      </div>
    </Link>
  );
};

export default BookGrid;
