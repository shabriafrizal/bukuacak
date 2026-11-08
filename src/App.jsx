import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Acak from "./routes/Acak";
import Buku from "./routes/Buku";
import Detail from "./routes/Detail";
import Tentang from "./routes/Tentang";
import API from "./routes/API";
import NotFound from "./routes/NotFound";
import Footer from "./Footer";

// Scroll back to the top whenever the route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Acak />} />
          <Route path="/index" element={<Acak />} />
          <Route path="/acak" element={<Acak />} />
          <Route path="/buku" element={<Buku />} />
          <Route path="/buku/:id" element={<Detail />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="/api" element={<API />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
