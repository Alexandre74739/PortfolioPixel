import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import './App.scss';

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
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
            <Route path="/a-propos" element={<About />} />
            <Route path="/arcades" element={<Arcades />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;