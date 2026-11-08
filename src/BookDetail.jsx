import { useState } from "react";
import TextAnimator from "./TextAnimator";

const FALLBACK_COVER = "/bukuacak_w.png";

const BookDetail = ({
  title = "",
  cover = "",
  description = "",
  genre = "",
  storeLink = "",
  textStore = "",
  published_date = "",
  publisher = "",
  total_pages = "",
  isbn = "",
  size = "",
  format = "",
  price = "",
  book_link = false,
}) => {
  const [imageSrc, setImageSrc] = useState(cover || FALLBACK_COVER);

  const details = [
    { label: "Genre", value: genre },
    { label: "Penerbit", value: publisher },
    { label: "Diterbitkan", value: published_date },
    { label: "Jumlah Halaman", value: total_pages },
    { label: "ISBN", value: isbn },
    { label: "Ukuran", value: size },
    { label: "Format", value: format },
  ].filter((item) => item.value);

  return (
    <div>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 p-4 mx-auto max-w-4xl">
        <div className="flex justify-center items-start h-full transition-all duration-300">
          <img
            src={imageSrc}
            alt={title ? `Sampul buku ${title}` : "Sampul buku"}
            width="300"
            height="400"
            className={
              imageSrc === FALLBACK_COVER
                ? "w-1/2 max-h-[320px] opacity-40 object-contain object-top"
                : "w-3/5 h-auto object-contain object-top"
            }
            onError={() => setImageSrc(FALLBACK_COVER)}
          />
        </div>

        <div className="flex flex-col h-full transition-all duration-300">
          <p className="text-light1 mb-4 text-4xl font-bold">{price}</p>

          {details.map((item) => (
            <p key={item.label} className="text-light1/50 mb-2 text-lg">
              {item.label}: {item.value}
            </p>
          ))}

          {book_link && (
            <p className="text-light1/50 mb-2 text-lg">
              Baca online:{" "}
              <a
                href={book_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 underline underline-offset-4"
              >
                Buka tautan
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
            </p>
          )}

          <div className="w-full h-[1px] mt-8 mb-8 bg-light1/5"></div>

          <div className="mt-auto">
            {storeLink ? (
              <a
                href={storeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block w-full items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-light1 rounded-lg hover:bg-bluesea group text-center"
              >
                <span className="w-48 h-48 rounded rotate-[-40deg] bg-bluesea absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className="relative w-full text-black transition-colors duration-300 ease-in-out group-hover:text-light1">
                  {textStore || "Cari di toko online"}
                </span>
              </a>
            ) : (
              <p className="text-center text-sm text-light1/40">
                Tautan pembelian belum tersedia untuk buku ini.
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] mt-8 mb-8 bg-light1/5"></div>
      <TextAnimator
        key={description} // Force re-render when description changes
        text={description}
        speed={25}
        maxWidth="4xl"
        lineHeight="relaxed"
        justify={true}
      />
    </div>
  );
};

export default BookDetail;
