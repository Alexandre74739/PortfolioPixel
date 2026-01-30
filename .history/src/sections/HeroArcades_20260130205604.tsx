import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundParticles from "../components/utils/BackgroundParticles";
import { Reveal } from "../components/layout/Reveal";
import BtnContact from "../components/utils/BtnContact";
import BtnGhost from "../components/utils/BtnGhost";
import "./HeroArcades.scss";

// Code simplifié : START (facile à retenir et à taper)
const CHEAT_CODE = ['s', 't', 'a', 'r', 't'];

const HeroArcades = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [typedCode, setTypedCode] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Bloquer le scroll quand verrouillé
  useEffect(() => {
    if (!isUnlocked) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isUnlocked]);

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
          clearTimeout(timer);
        } else if (newCode.length === CHEAT_CODE.length) {
          setFeedback('CODE INCORRECT');
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
    const event = new KeyboardEvent('keydown', { key: key });
    window.dispatchEvent(event);
  };

  // Clavier simplifié - lettres importantes seulement pour mobile
  const mobileKeys = [
    ['s', 't', 'a', 'r'],
    ['e', 'n', 't', 'del']
  ];

  // Clavier complet pour desktop
 const desktopKeys = [
  ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'],
  ['w', 'x', 'c', 'v', 'b', 'n', 'del'],
  ['➔', 'arrowright', 'space', 'enter']
];

  const keyboardKeys = isMobile ? mobileKeys : desktopKeys;

  return (
    <>
      <section className={`hero-arcades-cheatcode ${isUnlocked ? "unlocked" : "locked"}`}>
        <BackgroundParticles />

        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            /* Ecran de vérouillage */
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
                    <span>[LOCKED]</span>
                  </div>
                  <div className="main-display">
                    <h1 className="warning">SYSTEM BREACH</h1>
                    <p className="message">ENTER CODE</p>
                    <div className="code-display">
                      {typedCode.map((key, index) => (
                        <span key={index} className="typed-key">{key.toUpperCase()}</span>
                      ))}
                      <span className="cursor-blink">_</span>
                    </div>
                    {feedback && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`feedback ${feedback.includes('ACCORDÉ') ? 'correct' : 'incorrect'}`}
                      >
                        {feedback}
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Post-it */}
                <div className="sticky-note">
                  <span className="note-title">POST-IT</span>
                  <p>Pour démarrer le jeu...</p>
                  <p className="hint-code">S T A R T</p>
                </div>
              </div>

              {/* Clavier Virtuel */}
              <div className="virtual-keyboard">
                {keyboardKeys.map((row, rowIndex) => (
                  <div key={rowIndex} className="keyboard-row">
                    {row.map(key => (
                      <motion.button
                        key={key}
                        className={`key-button ${activeKey === key.toLowerCase() ? 'active' : ''} ${key === 'del' ? 'special' : ''} ${key === 'enter' ? 'special' : ''} ${key === 'space' ? 'special-wide' : ''}`}
                        onClick={() => {
                          if (key === 'del') {
                            setTypedCode(prev => prev.slice(0, -1));
                          } else if (key === 'enter') {
                            // Validation manuelle
                            if (typedCode.join('') === CHEAT_CODE.join('')) {
                              setIsUnlocked(true);
                              setFeedback('ACCÈS ACCORDÉ');
                            } else {
                              setFeedback('CODE INCORRECT');
                              setTimeout(() => {
                                setTypedCode([]);
                                setFeedback('');
                              }, 800);
                            }
                          } else {
                            handleVirtualKeyPress(key);
                          }
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {key === 'del' ? '←' : key === 'space' ? '___' : key === 'enter' ? '↵' : key.toUpperCase()}
                      </motion.button>
                    ))}
                  </div>
                ))}
              </div>

            </motion.div>
          ) : (

            /* --- Section Hero --- */
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

      {/* Overlay qui bloque le reste de la page */}
      {!isUnlocked && (
        <div className="page-blocker" />
      )}
    </>
  );
};

export default HeroArcades;