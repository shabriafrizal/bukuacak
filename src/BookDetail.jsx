import { useState } from "react";
import TextAnimator from "./TextAnimator";

const BookDetail = ({
  cover = "",
  description = "",
  genre = "",
  storeLink = "",
  textStore = "",
  published_date = "",
  total_pages = "",
  isbn = "",
  size = "",
  format = "",
  price = "",
}) => {
  return (
    <div>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 p-4 mx-auto max-w-4xl">
        <div className="flex justify-center items-start h-full transition-all duration-300">
          <img
            src={cover}
            alt="Book Cover"
            className="w-3/5 h-auto object-contain object-top"
          />
        </div>

        <div className="flex flex-col h-full transition-all duration-300">
          <p className="text-light1 mb-4 text-4xl font-bold">{price}</p>
          <p className="text-light1/50 mb-2 text-lg">Genre: {genre}</p>
          <p className="text-light1/50 mb-2 text-lg">
            Tanggal Diterbitkan: {published_date}
          </p>
          <p className="text-light1/50 mb-2 text-lg">
            Jumlah Halaman: {total_pages}
          </p>
          <p className="text-light1/50 mb-2 text-lg">ISBN: {isbn}</p>
          <p className="text-light1/50 mb-2 text-lg">Ukuran: {size}</p>
          <p className="text-light1/50 mb-2 text-lg">format: {format}</p>
          <div className="w-full h-[1px] mt-8 mb-8 bg-light1/5"></div>
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
