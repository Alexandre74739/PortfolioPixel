import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundParticles from "../components/utils/BackgroundParticles";
import { Reveal } from "../components/layout/Reveal";
import BtnContact from "../components/utils/BtnContact";
import BtnGhost from "../components/utils/BtnGhost";
import "./HeroArcades.scss";

const HeroArcades = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleDragEnd = (_: any, info: any) => {
    const slot = document.getElementById("target-slot");
    if (slot) {
      const rect = slot.getBoundingClientRect();
      if (
        info.point.x > rect.left && info.point.x < rect.right &&
        info.point.y > rect.top && info.point.y < rect.bottom
      ) {
        setIsLoaded(true);
      }
    }
  };

  return (
    <section className={`hero-arcades-premium ${isLoaded ? "unlocked" : "locked"}`}>
      <BackgroundParticles />

      <AnimatePresence mode="wait">
        {!isLoaded ? (
          <motion.div 
            key="boot-sequence"
            className="boot-container"
            exit={{ opacity: 0, scale: 0.95, filter: "blur(40px)" }}
            transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            {/* L'INTERFACE DE LA BORNE (VUE DE FACE MINIMALISTE) */}
            <div className="abstract-arcade">
              <div className="header-line">
                <span className="serial">ARC-PRTFL-2026</span>
                <div className="pulse-dot" />
              </div>

              <div className="main-display">
                <div id="target-slot" className="drop-zone">
                  <div className="scan-bar" />
                  <div className="status-text">
                    <span className="code">ERR_NO_DATA_CORE</span>
                    <h2 className="glitch" data-text="99%">99%</h2>
                  </div>
                </div>
              </div>

              <div className="footer-controls">
                <div className="geo-shape" />
                <span className="instruction">INITIALIZATION REQUIRED</span>
              </div>
            </div>

            {/* LE DATA CORE (OBJET DRAGGABLE DESIGN) */}
            <motion.div
              className="data-core-capsule"
              drag
              dragSnapToOrigin
              onDragEnd={handleDragEnd}
              whileHover={{ scale: 1.02 }}
              whileDrag={{ scale: 1.1, zIndex: 100 }}
            >
              <div className="glass-effect" />
              <div className="core-inner">
                <div className="pixel-icon">✦</div>
                <div className="label">SYSTEM_CORE_A</div>
              </div>
              <div className="magnetic-glow" />
            </motion.div>
          </motion.div>
        ) : (
          /* TA SECTION HERO (SANS CHANGEMENT DE CODE MAIS STYLE MIS À JOUR) */
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Reveal><div className="pixel-label">SYSTEM: OPERATIONAL</div></Reveal>
            <Reveal>
              <h1 className="hero-title">
                BIENVENUE AUX <span className="pixel-text">ARCADES</span>
              </h1>
            </Reveal>
            <Reveal>
              <p className="hero-subtitle">
                Plongez dans l'univers de mes réalisations. <br />
                À chaque jeu ses compétences.
              </p>
            </Reveal>
            <Reveal>
              <div className="hero-actions">
                <BtnContact to="/histoire">SELECT HISTOIRE</BtnContact>
                <BtnGhost to="/contact">SELECT PROJECTS</BtnGhost>
              </div>
            </Reveal>
            <div className="scroll-indicator">
              <div className="mouse"><div className="wheel"></div></div>
              <span>READY TO PLAY</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroArcades;