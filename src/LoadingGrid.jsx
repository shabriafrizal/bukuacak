const LoadingGrid = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-800 shadow-md rounded-lg overflow-hidden animate-pulse"
        >
          <div className="h-128 flex items-center justify-center bg-gray-700">
            <div className="h-64 w-32 bg-gray-700 rounded"></div>
          </div>
          <div className="p-4 space-y-2">
            <div className="h-4 bg-gray-600 rounded w-3/4 mx-auto"></div>
            <div className="h-3 bg-gray-600 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default LoadingGrid;
