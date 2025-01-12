function Tentang() {
  return (
    <section className="container mx-auto p-5 mt-20">
      <div>
        <div className="max-w-4xl mx-auto">
          <h1 className="font-semibold text-3xl mb-2">Tentang</h1>
          <p className="font-light text-light1/50">
            Apapun informasi mengenai Bukuacak, dan mengapa kami membangunnya.
          </p>
        </div>
        <div className="w-full h-[1px] mt-8 bg-light1/5"></div>
        <div className="p-9 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-light1 mb-4">
            Apa itu Bukuacak?
          </h2>
          <p className="text-light1/50 leading-relaxed text-justify">
            <strong>Bukuacak</strong> adalah aplikasi web open-source yang
            dibuat untuk membantu Anda menemukan buku baru secara spontan.
            Dengan fitur pencarian acak, Anda dapat menemukan rekomendasi buku
            tanpa perlu bingung memilih.
          </p>

          <h2 className="text-2xl font-semibold text-light1 mt-8 mb-4">
            Fitur Utama
          </h2>
          <ul className="list-disc list-inside">
            <li className="text-light1/50">
              <strong>Pencarian Buku Secara Acak:</strong> Klik satu tombol, dan
              dapatkan rekomendasi buku yang menarik.
            </li>
            <li className="text-light1/50">
              <strong>API Gratis:</strong> Pengembang dapat mengakses API kami
              untuk mengintegrasikan fitur ini ke aplikasi mereka.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-light1 mt-8 mb-4">
            Buku apa saja yang ada di Bukuacak?
          </h2>
          <p className="text-light1/50 leading-relaxed text-justify">
            Buku kami didapatkan secara daring melalui Search Engine di berbagai
            Publisher Buku dan Perorangan.{" "}
            <p className="text-light1/20 font-thin italic">
              (untuk sekarang hanya Gramedia)
            </p>
          </p>

          <h2 className="text-2xl font-semibold text-light1 mt-8 mb-4">
            Mengapa Bukuacak Dibuat?
          </h2>
          <p className="text-light1/50 leading-relaxed text-justify">
            Proyek ini dirancang oleh seorang pengembang independen sebagai
            upaya untuk belajar, berbagi manfaat, dan memberi kontribusi kepada
            komunitas. Bukuacak adalah eksperimen yang bertujuan untuk
            menghubungkan orang-orang dengan dunia literasi.
          </p>

          <h2 className="text-2xl font-semibold text-light1 mt-8 mb-4">
            Visi Kami
          </h2>
          <p className="text-light1/50 leading-relaxed text-justify">
            Bukuacak bukanlah proyek komersial, tetapi sebuah alat sederhana
            yang dirancang untuk memudahkan siapa saja dalam menemukan buku
            baru. Kami percaya bahwa literasi adalah jendela menuju perubahan,
            dan kami ingin menjadi bagian kecil dari perjalanan itu.
          </p>

          <h2 className="text-2xl font-semibold text-light1 mt-8 mb-4">
            Mari Bergabung!
          </h2>
          <p className="text-light1/50 leading-relaxed text-justify">
            Jadilah bagian dari komunitas Bukuacak. Baik sebagai pengguna,
            pengembang, atau pendukung, kontribusi Anda membantu kami untuk
            terus berkembang.
          </p>
          <div className="flex justify-center mt-12">
            <a
              target="_blank"
              href="https://github.com/shabriafrizal/bukuacak"
              className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-light1 rounded-lg hover:bg-bluesea group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="w-48 h-48 rounded rotate-[-40deg] bg-bluesea absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="relative min-w-[250px] md:min-w-[650px] lg:min-w-[800px] text-black transition-colors duration-300 ease-in-out group-hover:text-light1 text-center">
                Github repository
              </span>
            </a>
          </div>
        </div>
        <div className="w-full h-[1px] mt-8 mb-20 bg-light1/5"></div>
      </div>
    </section>
  );
}

export default Tentang;
