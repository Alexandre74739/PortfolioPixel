import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ghostImg from "../assets/ghost.png";
import BackgroundParticles from "../components/utils/BackgroundParticles";
import { Reveal } from "../components/layout/Reveal";
import "./SpaceManifesto.scss";

const SpaceManifesto = () => {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkOrientation = () =>
      setIsLandscape(window.innerWidth > window.innerHeight);
    window.addEventListener("resize", checkOrientation);
    checkOrientation();
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  return (
    <section
      className={`space-invader-section ${isLandscape ? "warning-level" : ""}`}
    >
      <BackgroundParticles />

      <div className="battle-hud">
        {/* L'armée d'envahisseurs en haut */}
        <div className="invaders-row">
          {[...Array(5)].map((_, i) => (
            <motion.img
              key={i}
              src={ghostImg}
              className="invader-unit"
              animate={{
                x: [0, 20, 0],
                filter: isLandscape
                  ? "hue-rotate(90deg) brightness(1.5)"
                  : "hue-rotate(0deg)",
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>

        <div className="main-terminal">
          <Reveal>
            <h1 className="scanner-text">START GAME</h1>
          </Reveal>

          <div className="content-grid">
            <Reveal>
              <div className="data-block">
                <span className="coord">X-001 // MA PHILOSOPHIE</span>
                <p>
                  Issu de l'animation, je transpose l'art de captiver et de
                  structurer dans le développement <strong>React</strong> et{" "}
                  <strong>Java</strong>. Je conçois des outils où la technicité
                  rencontre l'amusement. Mon équilibre : une architecture
                  instructive au service d'une expérience divertissante.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="data-block">
                <span className="coord">X-002 // EASTER EGG</span>
                <p>
                  Ce portfolio allie technicité et divertissement. J’y ai
                  injecté des <strong>Easter eggs</strong> et des références
                  cachées pour récompenser votre curiosité. Ne restez pas
                  spectateur : explorez l'interface pour découvrir ses secrets !
                </p>
              </div>
            </Reveal>
          </div>

          <div className="radar-module">
            <div className="radar-ping"></div>
            <div className="radar-info">
              <span className="status-label">
                RADAR_SCAN: {isLandscape ? "SÉQUENCE_ALTERNANCE" : "RECHERCHE..."}
              </span>
              <AnimatePresence>
                {isLandscape && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="secret-coord"
                  >
                    COORDONNÉES DÉCHIPHRÉES : "ALERTE : Vague d'envahisseurs détectée !!!".
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpaceManifesto;
