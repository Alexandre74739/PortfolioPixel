import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.scss";

interface FooterProps {
  currentTheme?: string;
}

const Footer = ({ currentTheme }: FooterProps) => {
  const safeTheme = currentTheme
    ? currentTheme.toLowerCase().replace(/\s+/g, "-")
    : "default";

  return (
    <footer className={`main-footer ${safeTheme}-theme`}>
      <div className="footer-container">
        <div className="footer-section status">
          <div className="status-badge">
            <span className="pulse"></span>
            <span>PLAYER 1 : READY</span>
          </div>
          <p className="copyright">PEREZ Alexandre-Philippe</p>
        </div>

        <nav className="footer-section navigation">
          <Link to="/">ACCUEIL</Link>
          <Link to="/a-propos">A PROPOS</Link>
          <Link to="/arcades">ARCADES</Link>
          <Link to="/contact">CONTACT</Link>
        </nav>

        <div className="footer-section social-items">
          <div className="social-links">
            <a href="https://www.linkedin.com/in/alexandre74739/">
              <FaLinkedin />
            </a>
            <a href="https://github.com/Alexandre74739">
              <FaGithub />
            </a>
            <a href="mailto:perezalexandre430@gmail.com">
              <FaEnvelope />
            </a>
          </div>
          <div className="score-display">
            <p>NEXT LEVEL : ALTERNANCE</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
