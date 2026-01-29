import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundParticles from "../components/utils/BackgroundParticles";
import { Reveal } from "../components/layout/Reveal";
import BtnContact from "../components/utils/BtnContact";
import BtnGhost from "../components/utils/BtnGhost";
import "./HeroArcades.scss";

// Le code de triche (exemple: HAUT, HAUT, BAS, BAS, GAUCHE, DROITE, GAUCHE, DROITE, B, A)
const CHEAT_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const HeroArcades = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [typedCode, setTypedCode] = useState<string[]>([]);
  const [feedback, setFeedback] = useState(''); // Pour afficher "CORRECT" ou "INCORRECT"
  const [activeKey, setActiveKey] = useState<string | null>(null); // Pour l'animation de la touche pressée

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isUnlocked) return;

      const key = e.key.toLowerCase();
      
      // Feedback visuel de la touche pressée
      setActiveKey(key);
      const timer = setTimeout(() => setActiveKey(null), 150);

      // Limite le code tapé à la longueur du cheat code
      setTypedCode(prev => {
        const newCode = [...prev, key].slice(-CHEAT_CODE.length);
        
        // Vérifie si le code tapé correspond au cheat code
        if (newCode.length === CHEAT_CODE.length && newCode.every((val, i) => val === CHEAT_CODE[i])) {
          setIsUnlocked(true);
          setFeedback('ACCÈS ACCORDÉ');
          clearTimeout(timer); // Annule le reset de la touche si le code est correct
        } else if (newCode.length === CHEAT_CODE.length) {
          setFeedback('CODE INCORRECT');
          // Reset le code tapé après un court délai pour retenter
          setTimeout(() => {
            setTypedCode([]);
            setFeedback('');
          }, 800);
        }
        return newCode;
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isUnlocked, typedCode]);

  // Pour le clavier virtuel
  const handleVirtualKeyPress = (key: string) => {
    // Simule un événement clavier pour réutiliser la logique existante
    const event = new KeyboardEvent('keydown', { key: key });
    window.dispatchEvent(event);
  };


  // Mappe les touches pour le clavier virtuel
  const keyboardKeys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'enter']
  ];


  return (
    <section className={`hero-arcades-cheatcode ${isUnlocked ? "unlocked" : "locked"}`}>
      <BackgroundParticles />

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          /* --- ÉCRAN DE VERROUILLAGE --- */
          <motion.div 
            key="lock-screen"
            className="lock-screen-container"
            exit={{ opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 0.8 }}
          >
            <div className="monitor-frame">
              <div className="screen-content">
                <div className="top-bar">
                  <span>ACCESS DENIED</span>
                  <span>[STATUS: LOCKED]</span>
                </div>
                <div className="main-display">
                  <h1 className="warning">SYSTEM BREACH PROTOCOL</h1>
                  <p className="message">ENTER AUTHENTICATION SEQUENCE</p>
                  <div className="code-display">
                    {typedCode.map((key, index) => (
                      <span key={index} className="typed-key">{key}</span>
                    ))}
                    <span className="cursor-blink">_</span>
                  </div>
                  {feedback && <motion.div 
                                  initial={{ opacity: 0, y: 10 }} 
                                  animate={{ opacity: 1, y: 0 }} 
                                  className={`feedback ${feedback.includes('ACCORDÉ') ? 'correct' : 'incorrect'}`}
                                >
                                  {feedback}
                                </motion.div>}
                </div>
              </div>
              
              {/* Le post-it / note cachée */}
              <div className="sticky-note">
                <span className="note-title">HINT:</span>
                <p>HAUT HAUT BAS BAS</p>
                <p>GAUCHE DROITE GAUCHE DROITE</p>
                <p>B A</p>
              </div>
            </div>

            {/* Clavier Virtuel */}
            <div className="virtual-keyboard">
              {keyboardKeys.map((row, rowIndex) => (
                <div key={rowIndex} className="keyboard-row">
                  {row.map(key => (
                    <motion.button
                      key={key}
                      className={`key-button ${activeKey === key.toLowerCase() ? 'active' : ''}`}
                      onClick={() => handleVirtualKeyPress(key)}
                      whileTap={{ scale: 0.9 }}
                    >
                      {key.includes('Arrow') ? key.replace('Arrow', '') : key.toUpperCase()}
                    </motion.button>
                  ))}
                </div>
              ))}
            </div>

          </motion.div>
        ) : (
          /* --- TA SECTION HERO CLASSIQUE --- */
          <motion.div 
            key="hero-main"
            className="hero-content-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Reveal><div className="pixel-label">SYSTEM: OPERATIONAL</div></Reveal>
            <Reveal>
              <h1 className="hero-title">
                BIENVENUE AUX <span className="pixel-text">ARCADES</span>
              </h1>
            </Reveal>
            <Reveal>
              <p className="hero-subtitle">
                Plongez dans l