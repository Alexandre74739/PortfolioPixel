import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundParticles from "../components/utils/BackgroundParticles";
import { Reveal } from "../components/layout/Reveal";
import BtnContact from "../components/utils/BtnContact";
import BtnGhost from "../components/utils/BtnGhost";
import "./HeroArcades.scss";

const HeroArcades = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [bootSequence, setBootSequence] = useState(0);

  // Simulation d'un faux terminal qui défile au début
  useEffect(() => {
    const timer = setInterval(() => {
      setBootSequence(prev => (prev < 4 ? prev + 1 : prev));
    }, 400);
    return () => clearInterval(timer);
  }, []);

  const handleDragEnd = (_: any, info: any) => {
    // Drop zone : le cercle central "Core"
    const target = document.getElementById("central-hub");
    if (target) {
      const rect = target.getBoundingClientRect();
      if (
        info.point.x > rect.left && info.point.x < rect.right &&
        info.point.y > rect.top && info.point.y < rect.bottom
      ) {
        setIsLoaded(true);
      }
    }
  };

  return (
    <section className={`hero-arcades-cinematic ${isLoaded ? "unlocked" : "locked"}`}>
      <BackgroundParticles />
      
      <AnimatePresence mode="wait">
        {!isLoaded ? (
          <motion.div 
            key="pre-load"
            className="boot-interface"
            exit={{ opacity: 0, scale: 1.5, filter: "brightness(2) blur(20px)" }}
            transition={{ duration: 0.8, ease: "circIn" }}
          >
            {/* CONTENU AVANT : Terminal technique */}
            <div className="terminal-overlay">
              <p>{bootSequence > 0 && "> INITIALIZING_CORE_ENGINE..."}</p>
              <p>{bootSequence > 1 && "> LOADING_ASSETS_99%..."}</p>
              <p>{bootSequence > 2 && "> ERROR: DATA_LINK_BROKEN"}</p>
              <p>{bootSequence > 3 && "> STATUS: MANUAL_OVERRIDE_REQUIRED"}</p>
            </div>

            <div className="interaction-grid">
              <div id="central-hub" className="central-hub">
                <div className="hub-ring" />
                <div className="hub-content">
                  <span className="percent">99</span>
                  <span className="unit">%</span>
                </div>
                <div className="scan-circle" />
              </div>

              {/* L'OBJET DRAGGABLE : La "Data Disk" minimaliste */}
              <motion.div
                className="data-disk"
                drag
                dragSnapToOrigin
                onDragEnd={handleDragEnd}
                whileDrag={{ scale: 1.1, zIndex: 100 }}
              >
                <div className="disk-inner">
                  <div className="notch" />
                  <span className="disk-label">CONNECT</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="hero-main"
            className="hero-content-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* CONTENU APRÈS : La section Hero enrichie */}
            <div className="hero-grid">
              <div className="hero-main-side">
                <Reveal>
                  <div className="system-status">
                    <span className="pulse-green" /> OPERATIONAL // SESSION_01
                  </div>
                </Reveal>

                <Reveal>
                  <h1 className="hero-title">
                    L'ART DU <br /> <span className="pixel-text">PIXEL</span> PERFECT
                  </h1>
                </Reveal>

                <Reveal>
                  <p className="hero-subtitle">
                    Développeur créatif & passionné d'arcades. <br />
                    Chaque projet est une nouvelle partie qui commence.
                  </p>
                </Reveal>

                <Reveal>
                  <div className="hero-actions">
                    <BtnContact to="/histoire">SELECT HISTOIRE</BtnContact>
                    <BtnGhost to="/contact">SELECT PROJECTS</BtnGhost>
                  </div>
                </Reveal>
              </div>

              {/* Contenu supplémentaire à droite pour le design */}
              <div className="hero-stats-side">
                <Reveal>
                  <div className="stat-item">
                    <span className="stat-val">100%</span>
                    <span className="stat-label">CREATIVITY</span>
                  </div>
                </Reveal>
                <Reveal>
                  <div className="stat-item">
                    <span className="stat-val">∞</span>
                    <span className="stat-label">PASSION</span>
                  </div>
                </Reveal>
              </div>
            </div>

            <div className="scroll-indicator-v2">
              <span className="line" />
              <span className="text">INSERT COIN TO CONTINUE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroArcades;