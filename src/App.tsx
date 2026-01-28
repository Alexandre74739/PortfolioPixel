import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import './App.scss';

// Pages
import Home from "./pages/Home";
import Histoire from "./pages/Histoire";
import Arcades from "./pages/Arcades";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/histoire" element={<Histoire />} />
            <Route path="/arcades" element={<Arcades />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;