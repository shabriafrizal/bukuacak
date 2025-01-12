import { useNavigate } from "react-router-dom";

const BookGrid = ({ id, cover, title, author }) => {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate(`/buku/${id}`);
  };
  return (
    <div
      className="bg-gray-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg hover:scale-105 transform transition-all duration-300 cursor-pointer h-full"
      data-id={id}
      onClick={handleDetailClick}
    >
      <div className="aspect-[3/4] flex items-center justify-center">
        <img src={cover} alt={title} className="w-full h-fit object-contain" />
      </div>
      <div className="p-4 flex flex-col justify-center items-center flex-1 min-h-[80px]">
        <h3 className="text-sm font-bold text-white text-center mb-1 line-clamp-2">
          {title}
        </h3>
        <p className="text-xs text-gray-400 text-center">{author}</p>
      </div>
    </div>
  );
};

export default BookGrid;
