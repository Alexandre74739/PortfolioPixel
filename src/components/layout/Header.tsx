import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BtnContact from "../utils/BtnContact";
import BtnGhost from "../utils/BtnGhost";
import "./Header.scss";

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const closeMenu = () => setOpen(false);

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "Histoire", path: "/histoire" },
    { name: "Arcades", path: "/arcades" },
  ];

  return (
    <header className={`main-header ${open ? "menu-is-open" : ""}`}>
      <div className="scanline-overlay" />

      <div className="header-inner">
        <Link to="/" className="header-logo" onClick={closeMenu}>
          <img src="../../src/assets/Logo.png" alt="Logo" />
          <div className="logo-text-wrapper">
            <span className="text-main">PEREZPIXEL</span>
            <span className="text-glitch red">PEREZPIXEL</span>
            <span className="text-glitch blue">PEREZPIXEL</span>
          </div>
        </Link>

        <nav className="nav-desktop">
          {navLinks.map((link) => (
            <BtnGhost
              key={link.path}
              to={link.path}
              isActive={pathname === link.path}
            >
              {link.name}
            </BtnGhost>
          ))}
          <BtnContact to="/contact">CONTACT</BtnContact>
        </nav>

        <button className="burger-btn" onClick={() => setOpen(!open)}>
          <span className="burger-bar" />
          <span className="burger-bar" />
          <span className="burger-bar" />
        </button>
      </div>

      <div className={`mobile-menu-container ${open ? "show" : ""}`}>
        <div className="mobile-overlay" onClick={closeMenu} />
        <nav className="mobile-nav">
          {navLinks.map((link) => (
            <BtnGhost
              key={link.path}
              to={link.path}
              isActive={pathname === link.path}
              onClick={closeMenu}
            >
              {link.name}
            </BtnGhost>
          ))}
          <BtnContact to="/contact" onClick={closeMenu}>
            CONTACT
          </BtnContact>
        </nav>
      </div>
    </header>
  );
}

export default Header;
