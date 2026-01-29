import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundParticles from "../components/utils/BackgroundParticles";
import { Reveal } from "../components/layout/Reveal";
import { useNavigate } from "react-router-dom";
import "./HeroArcades.scss";

const HeroArcades = () => {
  const navigate = useNavigate();
  const [activeCapsule, setActiveCapsule] = useState<string | null>(null);

  const capsules = [
    { id: "histoire", label: "HISTOIRE", icon: "📖", color: "#FF6B6B", path: "/histoire" },
    { id: "projets", label: "PROJECTS", icon: "🕹️", color: "#4ECDC4", path: "/projets" },
  ];

  const handleDragEnd = (path: string, info: any) => {
    // Si la capsule est relâchée au centre de l'écran (zone du socket)
    if (Math.abs(info.point.x - window.innerWidth / 2) < 100 && 
        Math.abs(info.point.y - window.innerHeight / 2) < 100) {
      navigate(path);
    }
    setActiveCapsule(null);
  };

  return (
    <section className="hero-arcades-clean">
      <BackgroundParticles />

      <div className="hero-content">
        <Reveal>
          <div className="pixel-label">PLAYER 1: CONNECTED</div>
        </Reveal>

        <Reveal>
          <h1 className="hero-title">
            BIENVENUE AUX <span className="pixel-text">ARCADES</span>
          </h1>
        </Reveal>

        <Reveal>
          <p className="hero-subtitle">
            Glissez une capsule dans le <strong>lecteur central</strong> pour commencer.
          </p>
        </Reveal>

        {/* Zone de dépôt (Le Socket) */}
        <div className="capsule-socket">
          <div className="socket-ring">
            <div className="socket-core">
              <span className="socket-hint">DROP HERE</span>
            </div>
          </div>
          {/* Effet visuel quand on survole avec une capsule */}
          <AnimatePresence>
            {activeCapsule && (
              <motion.div 
                className="socket-glow"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Les Capsules Draggables */}
        <div className="capsules-inventory">
          {capsules.map((cap) => (
            <div key={cap.id} className="capsule-wrapper">
              <motion.div
                className="capsule"
                drag
                dragSnapToOrigin
                onDragStart={() => setActiveCapsule(cap.id)}
                onDragEnd={(_, info) => handleDragEnd(cap.path, info)}
                whileDrag={{ scale: 1.2, zIndex: 100 }}
                whileHover={{ y: -10 }}
                style={{ backgroundColor: cap.color }}
              >
                <span className="cap-icon">{cap.icon}</span>
                <div className="cap-shine" />
              </motion.div>
              <span className="cap-label">{cap.label}</span>
            </div>
          ))}
        </div>

        <div className="scroll-indicator">
          <span>OU SCROLLEZ POUR EXPLORER</span>
        </div>
      </div>
    </section>
  );
};

export default HeroArcades;