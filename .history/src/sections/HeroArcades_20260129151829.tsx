import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundParticles from "../components/utils/BackgroundParticles";
import { Reveal } from "../components/layout/Reveal";
import BtnContact from "../components/utils/BtnContact";
import BtnGhost from "../components/utils/BtnGhost";
import "./HeroArcades.scss";

const HeroArcades = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHoveringSocket, setIsHoveringSocket] = useState(false);

  const handleDragEnd = (_: any, info: any) => {
    // Vérifie si l'objet est relâché sur l'écran du PC
    const screen = document.getElementById("pc-screen");
    if (screen) {
      const rect = screen.getBoundingClientRect();
      if (
        info.point.x > rect.left && info.point.x < rect.right &&
        info.point.y > rect.top && info.point.y < rect.bottom
      ) {
        setIsLoaded(true);
      }
    }
  };

  return (
    <section className={`hero-arcades ${isLoaded ? "unlocked" : "locked"}`}>
      <BackgroundParticles />

      <AnimatePresence mode="wait">
        {!isLoaded ? (
          /* --- ÉCRAN DE CHARGEMENT 99% --- */
          <motion.div 
            key="loading-screen"
            className="loading-overlay"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.8 }}
          >
            <div className="pc-container">
              <div id="pc-screen" className="pc-screen">
                <div className="glitch-text">SYSTEM LOADING...</div>
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: "99%" }}></div>
                  <span className="percentage">99%</span>
                </div>
                <div className="error-msg">ERROR: MISSING DATA CORE</div>
              </div>
              <div className="pc-base"></div>
            </div>

            <div className="drag-module">
              <motion.div
                className="data-core"
                drag
                dragSnapToOrigin
                onDrag={(e, info) => {
                    // Optionnel: petit feedback visuel si on survole l'écran
                    setIsHoveringSocket(true);
                }}
                onDragEnd={handleDragEnd}
                whileHover={{ scale: 1.1 }}
                whileDrag={{ scale: 1.2, zIndex: 100 }}
              >
                <div className="core-visual"></div>
                <span>DRAG TO FIX</span>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          /* --- TA SECTION HERO CLASSIQUE --- */
          <motion.div 
            key="hero-content"
            className="hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Reveal>
              <div className="pixel-label">SYSTEM: READY</div>
            </Reveal>

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
              <div className="mouse">
                <div className="wheel"></div>
              </div>
              <span>PRESS START TO PLAY !</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroArcades;