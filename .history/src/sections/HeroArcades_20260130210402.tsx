import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundParticles from "../components/utils/BackgroundParticles";
import { Reveal } from "../components/layout/Reveal";
import BtnContact from "../components/utils/BtnContact";
import BtnGhost from "../components/utils/BtnGhost";
import "./HeroArcades.scss";

// Code : Droite, Gauche, a, r, c, a, d, e, s, Gauche, Droite
const CHEAT_CODE = ['arrowright', 'arrowleft', 'a', 'r', 'c', 'a', 'd', 'e', 's', 'arrowleft', 'arrowright'];

const HeroArcades = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [typedCode, setTypedCode] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Gestion du scroll
  useEffect(() => {
    if (!isUnlocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isUnlocked]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isUnlocked) return;
      const key = e.key.toLowerCase();
      
      setActiveKey(key);
      setTimeout(() => setActiveKey(null), 150);

      setTypedCode(prev => {
        const newCode = [...prev, key].slice(-CHEAT_CODE.length);
        if (newCode.length === CHEAT_CODE.length && newCode.every((val, i) => val === CHEAT_CODE[i])) {
          setIsUnlocked(true);
          setFeedback('ACCÈS ACCORDÉ');
        } else if (newCode.length === CHEAT_CODE.length) {
          setFeedback('INCORRECT');
          setTimeout(() => { setTypedCode([]); setFeedback(''); }, 800);
        }
        return newCode;
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isUnlocked]);

  const handleVirtualKeyPress = (key: string) => {
    const event = new KeyboardEvent('keydown', { key: key });
    window.dispatchEvent(event);
  };

  const desktopKeys = [
    ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'],
    ['w', 'x', 'c', 'v', 'b', 'n', 's'],
    ['arrowleft', 'arrowright', 'del', 'enter']
  ];

  const mobileKeys = [
    ['a', 'r', 'c', 'a', 'd', 'e', 's'],
    ['arrowleft', 'arrowright', 'del', 'enter']
  ];

  const keyboardKeys = isMobile ? mobileKeys : desktopKeys;

  return (
    <section className={`hero-arcades-cheatcode ${isUnlocked ? "unlocked" : "locked"}`}>
      <BackgroundParticles />

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div 
            key="lock-screen" 
            className="lock-screen-container"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
          >
            <div className="monitor-frame">
              <div className="screen-content">
                <div className="top-bar">
                  <span>SÉCURITÉ SYSTÈME</span>
                  <span>[VERROUILLÉ]</span>
                </div>
                <div className="main-display">
                  <h1 className="warning">AUTHENTIFICATION</h1>
                  <div className="code-display">
                    {typedCode.map((key, index) => (
                      <span key={index} className="typed-key">
                        {key.includes('arrow') ? (key === 'arrowleft' ? '←' : '→') : key.toUpperCase()}
                      </span>
                    ))}
                    <span className="cursor-blink">_</span>
                  </div>
                  {feedback && <div className={`feedback ${feedback === 'ACCÈS ACCORDÉ' ? 'correct' : 'incorrect'}`}>{feedback}</div>}
                </div>
              </div>
              
              <div className="sticky-note">
                <span className="pin">📍</span>
                <span className="note-title">INDICE</span>
                <p>→ ←</p>
                <p className="hint-code">ARCADES</p>
                <p>← →</p>
              </div>
            </div>

            <div className="virtual-keyboard">
              {keyboardKeys.map((row, rowIndex) => (
                <div key={rowIndex} className="keyboard-row">
                  {row.map(key => (
                    <motion.button
                      key={key}
                      className={`key-button ${activeKey === key ? 'active' : ''} ${key.length > 1 ? 'special' : ''}`}
                      onClick={() => {
                         if(key === 'del') setTypedCode(p => p.slice(0, -1));
                         else handleVirtualKeyPress(key);
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {key === 'arrowleft' ? '←' : key === 'arrowright' ? '→' : key === 'del' ? '⌫' : key === 'enter' ? '↵' : key.toUpperCase()}
                    </motion.button>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="hero-main" className="hero-content-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Reveal><div className="pixel-label">ACCÈS AUTORISÉ</div></Reveal>
            <Reveal>
              <h1 className="hero-title">BIENVENUE AUX <span className="pixel-text">ARCADES</span></h1>
            </Reveal>
            <Reveal>
              <p className="hero-subtitle">Plongez dans l'univers de mes réalisations.</p>
            </Reveal>
            <Reveal>
              <div className="hero-actions">
                <BtnContact to="/histoire">SELECT HISTOIRE</BtnContact>
                <BtnGhost to="/contact">SELECT PROJECTS</BtnGhost>
              </div>
            </Reveal>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroArcades;