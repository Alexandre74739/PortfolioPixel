import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundParticles from "../components/utils/BackgroundParticles";
import { Reveal } from "../components/layout/Reveal";
import BtnContact from "../components/utils/BtnContact";
import BtnGhost from "../components/utils/BtnGhost";
import { useNavigate } from "react-router-dom";
import "./HeroArcades.scss";

const HeroArcades = () => {
  const navigate = useNavigate();
  const [draggedType, setDraggedType] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDragEnd = (path: string, info: any) => {
    const target = document.getElementById("main-socket");
    if (target) {
      const rect = target.getBoundingClientRect();
      // Vérification si déposé dans la zone cible
      if (
        info.point.x > rect.left && info.point.x < rect.right &&
        info.point.y > rect.top && info.point.y < rect.bottom
      ) {
        setIsProcessing(true);
        setTimeout(() => {
          navigate(path);
          setIsProcessing(false);
        }, 800);
      }
    }
    setDraggedType(null);
  };

  return (
    <section className="hero-arcades-pro">
      <BackgroundParticles />
      
      <div className="content-grid">
        {/* Colonne Gauche : Titres */}
        <div className="text-side">
          <Reveal>
            <div className="status-tag">SYSTEM OK // VERSION 2.0</div>
          </Reveal>
          <Reveal>
            <h1 className="title">
              DESIGN <br /> <span className="accent">&</span> ARCADE
            </h1>
          </Reveal>
          <Reveal>
            <p className="subtitle">
              Bienvenue. Utilisez les cartouches de données pour initialiser 
              le parcours. Déposez-les dans le lecteur pour valider.
            </p>
          </Reveal>
        </div>

        {/* Colonne Droite : Interface de Drag */}
        <div className="interface-side">
          <div id="main-socket" className={`socket ${isProcessing ? 'active' : ''}`}>
            <div className="socket-inner">
              {isProcessing ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: [0, 1, 0] }} 
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="processing-text"
                >
                  LOADING...
                </motion.div>
              ) : (
                <span className="socket-label">READING SLOT</span>
              )}
            </div>
            <div className="scan-line" />
          </div>

          <div className="cartridges-container">
            {/* Cartouche Histoire */}
            <div className="cartridge-box">
              <motion.div
                drag
                dragSnapToOrigin
                onDragStart={() => setDraggedType('histoire')}
                onDragEnd={(_, info) => handleDragEnd("/histoire", info)}
                whileHover={{ scale: 1.05 }}
                whileDrag={{ zIndex: 1000, scale: 1.1 }}
                className="cartridge history"
              >
                <div className="chip" />
                <BtnContact to="/histoire">SELECT HISTOIRE</BtnContact>
              </motion.div>
              <span className="hint">DRAG TO START</span>
            </div>

            {/* Cartouche Projets */}
            <div className="cartridge-box">
              <motion.div
                drag
                dragSnapToOrigin
                onDragStart={() => setDraggedType('projets')}
                onDragEnd={(_, info) => handleDragEnd("/contact", info)} // /contact ou /projets selon ton Btn
                whileHover={{ scale: 1.05 }}
                whileDrag={{ zIndex: 1000, scale: 1.1 }}
                className="cartridge projects"
              >
                <div className="chip" />
                <BtnGhost to="/contact">SELECT PROJECTS</BtnGhost>
              </motion.div>
              <span className="hint">DRAG TO BROWSE</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-info">
        <span>EST. 2026</span>
        <div className="divider" />
        <span>SCROLL TO BYPASS</span>
      </div>
    </section>
  );
};

export default HeroArcades;