import { useState } from "react";
import { Link } from "react-router-dom";
import BtnContact from "../components/utils/BtnContact";
import BtnGhost from "../components/utils/BtnGhost";
import BackgroundParticles from "../components/utils/BackgroundParticles";
import "./Hero.scss";

function Hero() {
  const [isDropped, setIsDropped] = useState(false);
  const [isSecure, setIsSecure] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [coinPosition, setCoinPosition] = useState({ x: 0, y: 0 });

  const onDropAction = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDropped(true);
    setIsDragging(false);
  };

  // Gestion du drag tactile (mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    setCoinPosition({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    setCoinPosition({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const touch = e.changedTouches[0];
    const dropZone = document.querySelector(".arcade-console");

    if (dropZone) {
      const rect = dropZone.getBoundingClientRect();
      const isOverDropZone =
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom;

      if (isOverDropZone) {
        setIsDropped(true);
      }
    }

    setIsDragging(false);
  };

  return (
    <section className="hero-section">
      <BackgroundParticles />
      <div className="scanline" />
      <div className="hero-container">
        <div className="hero-content">
          <div className="content-inner">
            <div
              className={`system-status ${isSecure ? "secure" : "warning"}`}
              onClick={() => setIsSecure(!isSecure)}
            >
              <span className={isDropped ? "status-ready" : "status-online"}>
                ● {isDropped ? "READY PLAYER ONE" : "SYSTEM ONLINE"}
              </span>
              <span className="version">
                {isSecure ? "ENCRYPTED" : "UNSECURED"}
              </span>
            </div>

            <h1 className="hero-title">
              ALEXANDRE
              <br />
              <span className="hero-subtitle">Développeur Web</span>
            </h1>

            <div className="tech-badges">
              {["React", "SCSS", "UX/UI Design", "Java"].map((tech) => (
                <span key={tech} className="badge">
                  {tech}
                </span>
              ))}
            </div>

            <p className="hero-description">
              Spécialisé en <span>React</span>, <span>UX/UI</span> et{" "}
              <span>Java</span>. Je traduis ma passion pour l'
              <span>animation</span> en expériences web fluides et humaines
              afin d'instruire autant que divertir.
            </p>

            <div className="hero-actions">
              <BtnContact to="/histoire">SELECT HISTOIRE</BtnContact>
              <BtnGhost to="/arcades">SELECT PROJECTS</BtnGhost>
            </div>
          </div>
        </div>

        <div className="hero-experience">
          <div className="text-container">
            <div className="instruction-box">
              <span className="cursor">{">"}</span>
              <p>
                SYSTÈME EN ATTENTE... GLISSEZ VITE LA PIÈCE POUR DÉBLOQUER
                L'ACCÈS
              </p>
            </div>
          </div>

          <div
            className={`arcade-console ${isDropped ? "is-active" : ""}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDropAction}
          >
            <div className="console-header">ALEX-STATION</div>
            <div className="console-screen">
              <div
                className={`screen-text ${isDropped ? "text-connected" : "text-insert"}`}
              >
                {isDropped ? "CONNECTED" : "INSERT COIN"}
              </div>
            </div>
            <div className="console-controls">
              <div className="led-power" />
              <div className="led-group">
                <div className="led-red" />
                <div className="led-blue" />
              </div>
            </div>
            <div className="console-slot-area">
              <div className="coin-slot">
                <div className={`slot-light ${isDropped ? "active" : ""}`} />
              </div>
            </div>
          </div>

          {!isDropped && (
            <div
              draggable
              onDragStart={(e) => e.dataTransfer.setData("text", "coin")}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className={`arcade-coin ${isDragging ? "is-dragging" : ""}`}
              style={
                isDragging
                  ? {
                      position: "fixed",
                      left: `${coinPosition.x - 30}px`,
                      top: `${coinPosition.y - 30}px`,
                      pointerEvents: "none",
                      zIndex: 1000,
                    }
                  : {}
              }
            >
              <span>A</span>
            </div>
          )}
        </div>
      </div>

      {isDropped && (
        <div className="modal-overlay" onClick={() => setIsDropped(false)}>
          <div
            className="modal-content"
            onClick={(e) =>
              e.stopPropagation()
            } /* Evite de fermer la modal en cliquant dessus */
          >
            <h2 className="modal-title">READY PLAYER ONE</h2>
            <p className="modal-text">
              Console activée !
              <br />
              Prêt pour l'aventure ?
            </p>
            <div className="modal-buttons">
              <Link to="/histoire" className="btn-modal-secondary">
                JE VEUX CONNAITRE L'HISTOIRE
              </Link>
              <Link to="/arcades" className="btn-modal-primary">
                JE VEUX EXPLORER LES SUCCES
              </Link>
            </div>
            <button
              onClick={() => setIsDropped(false)}
              className="btn-modal-exit"
            >
              QUITTER
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Hero;
