import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BackgroundParticles from "../components/utils/BackgroundParticles";
import BtnContact from "../components/utils/BtnContact";
import BtnGhost from "../components/utils/BtnGhost";
import { Reveal } from "../components/layout/Reveal";
import "./HeroArcades.scss";

const HeroArcades = () => {
  const [score, setScore] = useState(0);
  const [playerPosition, setPlayerPosition] = useState(50);
  const [isLandscape, setIsLandscape] = useState(false);

  // Détection de la rotation pour vos instructions spécifiques
  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    window.addEventListener("resize", checkOrientation);
    checkOrientation();
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  // Déplacement clavier
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && playerPosition > 5) setPlayerPosition(prev => prev - 5);
      if (e.key === 'ArrowRight' && playerPosition < 95) setPlayerPosition(prev => prev + 5);
      setScore(prev => prev + 1);
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [playerPosition]);

  return (
    <section className={`hero-minimal ${isLandscape ? 'landscape-mode' : ''}`}>
      <BackgroundParticles />
      
      <div className="container">
        <div className="game-hud">
          <span className="score">POINTS: {score}</span>
          {isLandscape && <span className="bonus-text">BONUS ROTATION ACTIVÉ !</span>}
        </div>

        <Reveal>
          <h1 className="main-title">PIXEL PORTFOLIO</h1>
        </Reveal>

        <Reveal>
          <p className="description">
            Développeur créatif explorant l'intersection entre le code et l'art numérique. 
            Utilisez les flèches pour déplacer le curseur-joueur.
          </p>
        </Reveal>

        <div className="cta-group">
          <BtnContact />
          <BtnGhost />
        </div>

        {/* Le petit système de jeu minimaliste */}
        <div className="mini-game-track">
          <motion.div 
            className="player-dot"
            animate={{ left: `${playerPosition}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <div className="finish-line" />
        </div>
      </div>
    </section>
  );
};

export default HeroArcades;