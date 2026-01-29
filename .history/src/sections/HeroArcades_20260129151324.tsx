import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Reveal } from "../components/layout/Reveal";
import "./HeroArcades.scss";

const HeroArcades = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Pour un effet de parallaxe sur le titre au mouvement de la souris
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX - window.innerWidth / 2);
    mouseY.set(clientY - window.innerHeight / 2);
  };

  const handleDragEnd = (_: any, info: any) => {
    // Si la capsule est déposée dans la zone cible (le socle)
    const target = document.getElementById("drop-zone");
    if (target) {
      const rect = target.getBoundingClientRect();
      if (
        info.point.x > rect.left &&
        info.point.x < rect.right &&
        info.point.y > rect.top &&
        info.point.y < rect.bottom
      ) {
        setIsLoading(true);
        // Simulation du chargement avant redirection ou scroll
        setTimeout(() => {
          document.querySelector(".game-selector")?.scrollIntoView({ behavior: "smooth" });
          setIsLoading(false);
        }, 1500);
      }
    }
  };

  return (
    <section className="hero-arcades-modern" onMouseMove={handleMouseMove}>
      <div className="background-grid" />
      
      <div className="content-wrapper">
        <header className="hero-header">
          <Reveal>
            <span className="index">01 — ARCADE INTERFACE</span>
          </Reveal>
          <Reveal>
            <h1 className="main-title">
              PIXEL<br />
              <span className="outline">COLLECTION</span>
            </h1>
          </Reveal>
          <Reveal>
            <p className="description">
              Une anthologie de projets numériques conçus avec précision. 
              Faites glisser l'unité centrale pour initialiser l'exploration.
            </p>
          </Reveal>
        </header>

        <div className="interaction-area">
          {/* Zone de dépôt stylisée */}
          <div id="drop-zone" className={`drop-base ${isLoading ? 'loading' : ''}`}>
            <div className="inner-base">
              {isLoading ? (
                <motion.div 
                  className="loading-bar"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                />
              ) : (
                <span className="base-label">INSERT CORE</span>
              )}
            </div>
            <div className="base-decoration" />
          </div>

          {/* L'objet à dragger : Le "Core" */}
          <motion.div
            className="core-object"
            drag
            dragSnapToOrigin
            onDragStart={() => setIsHovered(true)}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 1.1, cursor: "grabbing" }}
          >
            <div className="core-glass">
              <div className="core-content">
                <span className="core-icon">✦</span>
              </div>
            </div>
            {!isHovered && (
              <motion.div 
                className="drag-hint"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                DRAG ME
              </motion.div>
            )}
          </motion.div>
        </div>

        <footer className="hero-footer">
          <div className="status">
            <span className="dot" />
            READY TO INITIALIZE
          </div>
          <div className="year">© 2026</div>
        </footer>
      </div>
    </section>
  );
};

export default HeroArcades;