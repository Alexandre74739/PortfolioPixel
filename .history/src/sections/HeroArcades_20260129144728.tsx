import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BackgroundParticles from "../components/utils/BackgroundParticles";
import { Reveal } from "../components/layout/Reveal";
import "./HeroArcades.scss";

const HeroArcades = () => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [playerPosition, setPlayerPosition] = useState(85);
  const [barrels, setBarrels] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [coinsCollected, setCoinsCollected] = useState(0);

  // Animation du compteur de score
  useEffect(() => {
    if (score < 2250) {
      const timer = setTimeout(() => setScore(score + 50), 30);
      return () => clearTimeout(timer);
    }
  }, [score]);

  // Génération aléatoire de glitch
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.92) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 300);
      }
    }, 3000);
    return () => clearInterval(glitchInterval);
  }, []);

  // Génération de barrels tombants
  useEffect(() => {
    const barrelInterval = setInterval(() => {
      const newBarrel = {
        id: Date.now(),
        x: Math.random() > 0.5 ? 20 : 80,
        y: 15
      };
      setBarrels(prev => [...prev, newBarrel]);
      
      setTimeout(() => {
        setBarrels(prev => prev.filter(b => b.id !== newBarrel.id));
      }, 3000);
    }, 4000);
    
    return () => clearInterval(barrelInterval);
  }, []);

  // Déplacement du joueur avec les touches
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && playerPosition > 10) {
        setPlayerPosition(prev => prev - 5);
        setScore(prev => prev + 10);
      }
      if (e.key === 'ArrowRight' && playerPosition < 90) {
        setPlayerPosition(prev => prev + 5);
        setScore(prev => prev + 10);
      }
      if (e.key === ' ') {
        setScore(prev => prev + 100);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [playerPosition]);

  const handleStartGame = () => {
    const projectsSection = document.querySelector('.game-selector');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCoinCollect = () => {
    setCoinsCollected(prev => prev + 1);
    setScore(prev => prev + 500);
  };

  const handleDragEnd = (info: any) => {
    setIsDragging(false);
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
  };

  return (
    <section className={`hero-arcades ${glitchActive ? 'glitch-active' : ''}`}>
      <BackgroundParticles />
      
      {/* Overlay de glitch */}
      {glitchActive && (
        <div className="glitch-overlay">
          <div className="glitch-line" style={{ top: '20%' }} />
          <div className="glitch-line" style={{ top: '50%' }} />
          <div className="glitch-line" style={{ top: '80%' }} />
        </div>
      )}

      <div className="kong-container">
        
        {/* Header avec score et vies */}
        <div className="game-header">
          <div className="score-panel">
            <span className="label">1UP</span>
            <span className="value">{score.toString().padStart(6, '0')}</span>
          </div>
          <div className="high-score-panel">
            <span className="label">HIGH SCORE</span>
            <span className="value">225000</span>
          </div>
          <div className="lives-panel">
            <span className="label">LIVES</span>
            <div className="lives-icons">
              {[...Array(lives)].map((_, i) => (
                <span key={i} className="life-icon">♥</span>
              ))}
            </div>
          </div>
          <div className="coins-panel">
            <span className="label">COINS</span>
            <span className="value">×{coinsCollected}</span>
          </div>
        </div>

        {/* Zone de jeu principale */}
        <div className="game-screen">
          
          {/* Barrels tombants */}
          {barrels.map(barrel => (
            <motion.div
              key={barrel.id}
              className="falling-barrel"
              initial={{ x: `${barrel.x}%`, y: `${barrel.y}%` }}
              animate={{ 
                y: '90%',
                rotate: 720,
                x: `${barrel.x + (Math.random() - 0.5) * 30}%`
              }}
              transition={{ duration: 3, ease: "linear" }}
            >
              ⬢
            </motion.div>
          ))}

          {/* Plateforme supérieure avec le titre */}
          <div className="platform platform-top">
            <div className="barrels-container">
              <motion.div 
                className="barrel"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                ⬢
              </motion.div>
              <motion.div 
                className="barrel"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
              >
                ⬢
              </motion.div>
              <motion.div 
                className="barrel"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
              >
                ⬢
              </motion.div>
            </div>
            <Reveal>
              <h1 
                className={`game-title ${glitchActive ? 'glitch-text' : ''}`}
                onClick={(e) => {
                  if (e.detail === 3) {
                    setGlitchActive(true);
                    setTimeout(() => setGlitchActive(false), 2000);
                  }
                }}
              >
                ARCADES
                <span className="glitch-copy" aria-hidden="true">ARCADES</span>
                <span className="glitch-copy" aria-hidden="true">ARCADES</span>
              </h1>
            </Reveal>
          </div>

          {/* Échelles et plateformes */}
          <div className="ladder ladder-1" />
          
          <div className="platform platform-2">
            <Reveal>
              <div className="stats-row">
                <motion.div 
                  className="stat-item"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="stat-icon">⚛️</span>
                  <span className="stat-text">REACT×3</span>
                </motion.div>
                <motion.div 
                  className="stat-item"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="stat-icon">🎨</span>
                  <span className="stat-text">UX/UI×3</span>
                </motion.div>
                <motion.div 
                  className="stat-item"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="stat-icon">☕</span>
                  <span className="stat-text">JAVA×3</span>
                </motion.div>
              </div>
            </Reveal>
            
            {/* Pièces draggables */}
            <motion.div
              className="collectible-coin"
              drag
              dragSnapToOrigin
              dragElastic={0.2}
              whileDrag={{ scale: 1.2, zIndex: 1000 }}
              onDragStart={() => {
                setIsDragging(true);
                document.body.style.overflow = 'hidden';
                document.body.style.touchAction = 'none';
              }}
              onDragEnd={(_, info) => {
                handleDragEnd(info);
                const target = document.elementFromPoint(info.point.x, info.point.y);
                if (target?.closest('.player-character')) {
                  handleCoinCollect();
                }
              }}
              style={{ touchAction: "none", userSelect: "none" }}
            >
              💰
            </motion.div>
          </div>

          <div className="ladder ladder-2" />

          <div className="platform platform-3">
            <Reveal>
              <p className="game-subtitle">
                9 PROJETS À DÉCOUVRIR<br />
                <span className="subtitle-hint">Utilisez ← → pour bouger • ESPACE pour sauter</span>
              </p>
            </Reveal>
            
            {/* Autre pièce draggable */}
            <motion.div
              className="collectible-coin"
              drag
              dragSnapToOrigin
              dragElastic={0.2}
              whileDrag={{ scale: 1.2, zIndex: 1000 }}
              onDragStart={() => {
                setIsDragging(true);
                document.body.style.overflow = 'hidden';
                document.body.style.touchAction = 'none';
              }}
              onDragEnd={(_, info) => {
                handleDragEnd(info);
                const target = document.elementFromPoint(info.point.x, info.point.y);
                if (target?.closest('.player-character')) {
                  handleCoinCollect();
                }
              }}
              style={{ touchAction: "none", userSelect: "none" }}
            >
              💰
            </motion.div>
          </div>

          <div className="ladder ladder-3" />

          {/* Plateforme du bas avec bouton START */}
          <div className="platform platform-bottom">
            <Reveal>
              <motion.button 
                className="start-button" 
                onClick={handleStartGame}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95, y: 2 }}
              >
                <span className="btn-icon">▶</span>
                <span className="btn-text">START</span>
              </motion.button>
            </Reveal>
            
            {/* Personnage contrôlable */}
            <motion.div 
              className="player-character"
              style={{ left: `${playerPosition}%` }}
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <div className="character-head" />
              <div className="character-body" />
              <div className="character-legs" />
            </motion.div>

            {/* Pièce sur la plateforme du bas */}
            <motion.div
              className="collectible-coin coin-bottom"
              drag
              dragSnapToOrigin
              dragElastic={0.2}
              whileDrag={{ scale: 1.2, zIndex: 1000 }}
              onDragStart={() => {
                setIsDragging(true);
                document.body.style.overflow = 'hidden';
                document.body.style.touchAction = 'none';
              }}
              onDragEnd={(_, info) => {
                handleDragEnd(info);
                const target = document.elementFromPoint(info.point.x, info.point.y);
                if (target?.closest('.player-character')) {
                  handleCoinCollect();
                }
              }}
              style={{ touchAction: "none", userSelect: "none" }}
            >
              💰
            </motion.div>
          </div>

          {/* Poutres diagonales style DK */}
          <div className="girder girder-1" />
          <div className="girder girder-2" />
          <div className="girder girder-3" />
          <div className="girder girder-4" />
        </div>

        {/* Footer avec INSERT COIN */}
        <div className="game-footer">
          <div className="insert-coin">
            <span className="coin-text">INSERT COIN</span>
            <motion.span 
              className="coin-blink"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ●
            </motion.span>
          </div>
          <div className="game-info">
            <span>PRESS START TO PLAY</span>
          </div>
          <div className="controls-hint">
            <span>🎮 ← → SPACE</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroArcades;