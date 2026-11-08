const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (!totalPages || totalPages < 2) return null;

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

  const goTo = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <nav
      aria-label="Navigasi halaman"
      className="flex justify-center items-center gap-1 mt-8 text-sm"
    >
      <button
        type="button"
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Halaman sebelumnya"
        className="px-3 py-1 rounded-md bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bluesea transition-colors"
      >
        {"<"}
      </button>

      {getPageNumbers().map((pageNum, index) =>
        typeof pageNum === "number" ? (
          <button
            key={pageNum}
            type="button"
            onClick={() => goTo(pageNum)}
            aria-label={`Halaman ${pageNum}`}
            aria-current={pageNum === currentPage ? "page" : undefined}
            className={`px-3 py-1 rounded-md transition-colors ${
              pageNum === currentPage
                ? "bg-bluesea text-white font-semibold"
                : "bg-gray-800 text-white hover:bg-bluesea"
            }`}
          >
            {pageNum}
          </button>
        ) : (
          <span
            key={`dots-${index}`}
            aria-hidden="true"
            className="px-2 text-light1/40"
          >
            {pageNum}
          </span>
        )
      )}

      <button
        type="button"
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Halaman berikutnya"
        className="px-3 py-1 rounded-md bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bluesea transition-colors"
      >
        {">"}
      </button>
    </nav>
  );
};

export default Pagination;
