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
    const slot = document.getElementById("arcade-slot");
    if (slot) {
      const rect = slot.getBoundingClientRect();
      // On vérifie si la cartouche est déposée dans la fente de la borne
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
          <motion.div 
            key="arcade-intro"
            className="arcade-intro"
            exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
            transition={{ duration: 0.6 }}
          >
            {/* LA BORNE D'ARCADE */}
            <div className="arcade-cabinet">
              <div className="cabinet-top">
                <div className="marquee">PORTFOLIO.SYS</div>
              </div>
              
              <div id="arcade-slot" className="screen-area">
                <div className="crt-effect"></div>
                <div className="loading-state">
                  <span className="blink">INSERT CARTRIDGE</span>
                  <div className="mini-progress">
                    <div className="bar" style={{ width: "99%" }}></div>
                  </div>
                  <span className="percentage">99%</span>
                </div>
              </div>

              <div className="controls-panel">
                <div className="joystick"><div className="stick"></div></div>
                <div className="buttons">
                  <div className="btn red"></div>
                  <div className="btn blue"></div>
                </div>
              </div>
            </div>

            {/* LA CARTOUCHE À DRAGGER */}
            <motion.div
              className="game-cartridge"
              drag
              dragSnapToOrigin
              onDragEnd={handleDragEnd}
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileDrag={{ scale: 1.1, zIndex: 100, rotate: 0 }}
            >
              <div className="cartridge-label">
                <span className="label-title">ARCADE</span>
                <span className="label-subtitle">DATA CORE v1.0</span>
              </div>
              <div className="pins"></div>
              <div className="drag-handle">DRAG TO SLOT</div>
            </motion.div>
          </motion.div>
        ) : (
          /* TA SECTION HERO CLASSIQUE (Inchangée) */
          <motion.div 
            key="hero-content"
            className="hero-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Reveal><div className="pixel-label">SYSTEM: READY</div></Reveal>
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
              <span>PRESS START TO PLAY !</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroArcades;