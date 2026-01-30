import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundParticles from "../components/utils/BackgroundParticles";
import VirtualKeyboard from "../components/utils/VirtualKeyboard";
import BtnContact from "../components/utils/BtnContact";
import BtnGhost from "../components/utils/BtnGhost";
import "./HeroArcades.scss";

const CHEAT_CODE = ['s', 't', 'a', 'r', 't'];

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

  useEffect(() => {
    if (!isUnlocked) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }
    return () => { document.documentElement.style.overflow = ''; };
  }, [isUnlocked]);

  const handleInput = (key: string) => {
    if (isUnlocked) return;
    const k = key.toLowerCase();
    setActiveKey(k);
    setTimeout(() => setActiveKey(null), 150);

    if (k === 'del') {
      setTypedCode(prev => prev.slice(0, -1));
      return;
    }

    setTypedCode(prev => {
      const newCode = [...prev, k].slice(-CHEAT_CODE.length);
      if (newCode.length === CHEAT_CODE.length) {
        if (newCode.join('') === CHEAT_CODE.join('')) {
          setIsUnlocked(true);
          setFeedback('ACCÈS ACCORDÉ');
        } else {
          setFeedback('CODE INCORRECT');
          setTimeout(() => { setTypedCode([]); setFeedback(''); }, 800);
        }
      }
      return newCode;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => handleInput(e.key);
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isUnlocked]);

  const desktopKeys = [
    ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'],
    ['w', 'x', 'c', 'v', 'b', 'n', 'del'],
    ['arrowleft', 'arrowright', 'enter']
  ];

  const mobileKeys = [
    ['a', 'r', 'c', '', 's', 't'],
    ['arrowleft', 'arrowright', 'del', 'enter']
  ];

  return (
    <section className={`hero-arcades-wrapper ${isUnlocked ? "unlocked" : "locked"}`}>
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="lock-screen"
            className="lock-overlay"
            exit={{ opacity: 0, y: -50 }}
          >
            <div className="monitor-frame">
              <div className="screen-content">
                <div className="top-bar"><span>SYSTEM_STATUS</span><span>[ENCRYPTED]</span></div>
                <div className="main-display">
                  <h1 className="glitch-title" data-text="LOCKED">LOCKED</h1>
                  <div className="code-dots">
                    {CHEAT_CODE.map((_, i) => (
                      <span key={i} className={`dot ${typedCode.length > i ? 'filled' : ''}`} />
                    ))}
                  </div>
                  {feedback && <div className={`feedback ${feedback.includes('ACCORDÉ') ? 'correct' : 'incorrect'}`}>{feedback}</div>}
                </div>
              </div>
              <div className="post-it">
                <p>INDICE :</p>
                <p>START</p>
              </div>
            </div>
            <VirtualKeyboard
              keys={isMobile ? mobileKeys : desktopKeys}
              activeKey={activeKey}
              onKeyPress={handleInput}
            />
          </motion.div>
        ) : (
          <motion.div
            key="hero-content"
            className="hero-main-content"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            <BackgroundParticles />
            <div className="content-inner">
              <span className="label-top">SYSTEM: OPERATIONAL</span>
              <h1 className="hero-title">BIENVENUE AUX <span className="accent">ARCADES</span></h1>
              <p className="hero-subtitle">Plongez dans l'univers de mes réalisations. À chaque jeu ses compétences.</p>
              <div className="hero-actions">
                <BtnContact to="/histoire">SELECT HISTOIRE</BtnContact>
                <BtnGhost to="/contact">SELECT PROJECTS</BtnGhost>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroArcades;