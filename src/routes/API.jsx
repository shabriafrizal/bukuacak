import ApiDocumentation from "../ApiDocumentation";

function API() {
  return (
    <section className="container mx-auto p-5 mt-20">
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
