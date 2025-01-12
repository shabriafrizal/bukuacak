import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex justify-center items-center gap-1 mt-8 text-sm">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bluesea transition-colors"
      >
        {"<"}
      </button>

      {getPageNumbers().map((pageNum, index) => (
        <button
          key={index}
          onClick={() =>
            typeof pageNum === "number" ? onPageChange(pageNum) : null
          }
          disabled={pageNum === "..."}
          className={`px-3 py-1 rounded-md ${
            pageNum === currentPage
              ? "bg-bluesea text-white"
              : pageNum === "..."
              ? "bg-transparent cursor-default"
              : "bg-gray-800 text-white hover:bg-bluesea transition-colors"
          }`}
        >
          {pageNum}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bluesea transition-colors"
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
