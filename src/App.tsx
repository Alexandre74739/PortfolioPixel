import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/utils/ScrollToTop";
import Header from "./components/layout/Header";
import ProjectDetail from "./sections/ProjectDetail";
import Footer from "./components/layout/Footer";
import "./App.scss";

// Pages
import Home from "./pages/Home";
import Histoire from "./pages/Histoire";
import Arcades from "./pages/Arcades";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <ScrollToTop />

      <div className="app-wrapper">
        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/histoire" element={<Histoire />} />
            <Route path="/arcades" element={<Arcades />} />
            <Route path="/arcades/:projectName" element={<ProjectDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
