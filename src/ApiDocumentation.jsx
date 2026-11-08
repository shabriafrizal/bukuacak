import { useState } from "react";
import { API_BASE_URL } from "./config/api";

const endpoints = [
  {
    title: "Get Books with Filters",
    path: "book?sort={urut}&page={angka}&year={tahun}&genre={genre}&keyword={kata kunci}",
    example: "book?page=1&year=2023&genre=Self-Improvement&keyword=Berani",
    description:
      "Mengambil daftar buku berdasarkan filter yang diberikan seperti urutan, halaman, tahun, genre, dan kata kunci. Urutan antara lain newest, oldest, titleAZ, titleZA, priceLowHigh, dan priceHighLow",
  },
  {
    title: "Get Book by _ID",
    path: "book/{_id}",
    example: "book/6782324379bd51cee772b72d",
    description: "Mengambil detail buku berdasarkan ID buku.",
  },
  {
    title: "Get Book by Query Parameter",
    path: "book?_id={_id}",
    example: "book?_id=6782324379bd51cee772b72d",
    description:
      "Mengambil detail buku dengan ID yang diberikan sebagai query parameter.",
  },
  {
    title: "Get Random Book",
    path: "random_book?year={tahun}&genre={genre}&keyword={kata kunci}",
    example: "random_book?year=2023&genre=Romance&keyword=cinta",
    description:
      "Mengambil buku secara acak dengan filter opsional seperti tahun, genre, dan kata kunci.",
  },
  {
    title: "Get Genre Statistics",
    path: "stats/genre",
    example: "stats/genre",
    description: "Mengambil statistik jumlah buku berdasarkan genre.",
  },
];

const host = API_BASE_URL.replace(/^https?:\/\//, "");

const ApiDocumentation = () => {
  const [copiedPath, setCopiedPath] = useState("");

  const copy = async (value) => {
    try {
      await navigator.clipboard.writeText(`${API_BASE_URL}/${value}`);
      setCopiedPath(value);
      setTimeout(() => setCopiedPath(""), 1500);
    } catch {
      // Clipboard access can be blocked; the URL stays visible on screen.
    }
  };

  return (
    <div className="p-9 max-w-4xl mx-auto">
      <p className="text-light1/50 mb-8">
        Berikut adalah dokumentasi API Bukuacak. Gunakan endpoint berikut untuk
        mengintegrasikan fitur ke aplikasi Anda. Semua endpoint bersifat publik
        dan tidak memerlukan API key.
      </p>
      {endpoints.map((endpoint) => (
        <div
          key={endpoint.title}
          className="mb-6 border border-light1/10 rounded-lg p-4 bg-[#2a2a2a] shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-100">
            {endpoint.title}
          </h2>
          <div className="mt-2">
            <p className="text-gray-300/50">
              <strong>Method:</strong>{" "}
              <span className="px-2 py-1 text-sm text-green-400 bg-green-900 rounded">
                GET
              </span>
            </p>
            <div className="mt-4 mb-2">
              <div className="flex flex-col sm:flex-row items-start gap-2">
                <div className="w-full overflow-x-auto bg-dark1 rounded-lg">
                  <code className="block px-4 py-2 text-sm text-light1 whitespace-nowrap">
                    {host}/{endpoint.path}
                  </code>
                </div>
                <button
                  type="button"
                  onClick={() => copy(endpoint.example)}
                  className="shrink-0 px-3 py-2 text-xs rounded-lg bg-dark1 text-light1/70 hover:text-light1 hover:bg-dark2 transition-colors"
                >
                  {copiedPath === endpoint.example ? "Tersalin!" : "Salin URL"}
                </button>
              </div>
            </div>
            <p className="text-gray-300/50 mt-2">
              <strong>Description:</strong> {endpoint.description}
            </p>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${API_BASE_URL}/${endpoint.example}`}
              className="min-w-full mt-6 mb-2 inline-flex items-center justify-center p-5 text-base font-medium text-light1 rounded-lg bg-dark1 hover:bg-dark2"
            >
              <span className="w-full">Coba endpoint</span>
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
