import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Acak from "./routes/Acak";
import Buku from "./routes/Buku";
import Detail from "./routes/Detail";
import Tentang from "./routes/Tentang";
import API from "./routes/API";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/index" element={<Acak />} />
        <Route path="/" element={<Acak />} />
        <Route path="/Acak" element={<Acak />} />
        <Route path="/Buku" element={<Buku />} />
        <Route path="/Buku/:id" element={<Detail />} />
        <Route path="/Tentang" element={<Tentang />} />
        <Route path="/API" element={<API />} />
      </Routes>
    </Router>
  );
}

export default App;
