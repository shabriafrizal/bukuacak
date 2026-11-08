import ApiDocumentation from "../ApiDocumentation";
import Seo from "../Seo";

function API() {
  return (
    <section className="container mx-auto p-5 mt-20">
      <Seo
        title="Dokumentasi API"
        description="API Bukuacak gratis dan terbuka: ambil daftar buku, detail buku, buku acak, dan statistik genre dalam format JSON."
        path="/api"
        keywords={["api buku", "api gratis", "bukuacak api", "rest api buku"]}
      />
      <div>
        <div className="rounded-lg max-w-4xl mx-auto">
          <h1 className="font-semibold text-3xl mb-2">API</h1>
          <p className="font-light text-light1/50">
            Dapatkan API kami secara gratis untuk mengembangkan aplikasi kamu.
          </p>
        </div>
        <div className="w-full h-[1px] mt-8 bg-light1/5"></div>
        <ApiDocumentation />
      </div>
    </section>
  );
}

export default API;
