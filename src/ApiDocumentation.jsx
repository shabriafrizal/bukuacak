const ApiDocumentation = () => {
  const endpoints = [
    {
      title: "Get Books with Filters",
      method: "GET",
      url: "bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/book?sort={urut}&page={angka}&year={tahun}&genre={genre}&keyword={kata kunci}",
      description:
        "Mengambil daftar buku berdasarkan filter yang diberikan seperti urutan, halaman, tahun, genre, dan kata kunci. Urutan antara lain newest, oldest, titleAZ, titleZA, priceLowHigh, dan priceHighLow",
      example:
        "bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/book?page=1&year=2023&genre=Self-Improvement&keyword=Berani",
    },
    {
      title: "Get Book by _ID",
      method: "GET",
      url: "bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/book/{_id}",
      description: "Mengambil detail buku berdasarkan ID buku.",
      example:
        "bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/book/6780fe7e1e0f1c11c617c2a2",
    },
    {
      title: "Get Book by Query Parameter",
      method: "GET",
      url: "bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/book?_id={_id}",
      description:
        "Mengambil detail buku dengan ID yang diberikan sebagai query parameter.",
      example:
        "bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/book?_id=67822def79bd51cee772b4dc",
    },
    {
      title: "Get Random Book",
      method: "GET",
      url: "bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/random_book?year={tahun}&genre={genre}&keyword={kata kunci}",
      description:
        "Mengambil buku secara acak dengan filter opsional seperti tahun, genre, dan kata kunci.",
      example:
        "bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/random_book?year=2023&genre=mystery&keyword=detective",
    },
    {
      title: "Get Genre Statistics",
      method: "GET",
      url: "bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/stats/genre",
      description: "Mengambil statistik jumlah buku berdasarkan genre.",
      example: "bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/stats/genre",
    },
  ];

  return (
    <div className="p-9 max-w-4xl mx-auto">
      <p className="text-light1/50 mb-8">
        Berikut adalah dokumentasi API Bukuacak. Gunakan endpoint berikut untuk
        mengintegrasikan fitur ke aplikasi Anda.
      </p>
      {endpoints.map((endpoint, index) => (
        <div
          key={index}
          className="mb-6 border border-light1/10 rounded-lg p-4 bg-[#2a2a2a] shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-100">
            {endpoint.title}
          </h2>
          <div className="mt-2">
            <p className="text-gray-300/50">
              <strong>Method:</strong>{" "}
              <span className="px-2 py-1 text-sm text-green-400 bg-green-900 rounded">
                {endpoint.method}
              </span>
            </p>
            <div className="mt-4 mb-2">
              <div className="flex flex-col sm:flex-row items-start gap-2">
                <div className="w-full overflow-x-auto bg-dark1 rounded-lg">
                  <code className="block px-4 py-2 text-sm text-light1 whitespace-nowrap">
                    {endpoint.url}
                  </code>
                </div>
              </div>
            </div>
            <p className="text-gray-300/50 mt-2">
              <strong>Description:</strong> {endpoint.description}
            </p>

            <a
              target="_blank"
              href={"https://" + endpoint.example}
              className="min-w-full mt-6 mb-2 inline-flex items-center justify-center p-5 text-base font-medium text-light1 rounded-lg bg-dark1  hover:bg-dark2"
            >
              <span className="w-full">Example</span>
              <svg
                className="w-4 h-4 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path stroke="currentColor" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApiDocumentation;
