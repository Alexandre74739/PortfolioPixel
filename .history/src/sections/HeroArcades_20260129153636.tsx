import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundParticles from "../components/utils/BackgroundParticles";
import { Reveal } from "../components/layout/Reveal";
import BtnContact from "../components/utils/BtnContact";
import BtnGhost from "../components/utils/BtnGhost";
import "./HeroArcades.scss";

// Code : Droite, Gauche, a, r, c, a, d, e, Gauche, Droite
const CHEAT_CODE = ['arrowright', 'arrowleft', 'a', 'r', 'c', 'a', 'd', 'e', 'arrowleft', 'arrowright'];

const HeroArcades = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [typedCode, setTypedCode] = useState<string[]>([]);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  // Bloquer le scroll tant que le code n'est pas entré
  useEffect(() => {
    document.body.style.overflow = isUnlocked ? "auto" : "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, [isUnlocked]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isUnlocked) return;
      const key = e.key.toLowerCase();
      
      setActiveKey(key);
      setTimeout(() => setActiveKey(null), 150);

      setTypedCode(prev => {
        const newCode = [...prev, key].slice(-CHEAT_CODE.length);
        if (JSON.stringify(newCode) === JSON.stringify(CHEAT_CODE)) {
          setIsUnlocked(true);
        }
        return newCode;
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isUnlocked]);

  const azertyRows = [
    ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'],
    ['w', 'x', 'c', 'v', 'b', 'n', 'arrowleft', 'arrowup', 'arrowdown', 'arrowright']
  ];

  return (
    <section className={`hero-arcades-premium ${isUnlocked ? "unlocked" : "locked"}`}>
      <BackgroundParticles />

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div 
            key="lock-screen"
            className="boot-container"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.8 }}
          >
            {/* L'ORDINATEUR DESIGN (FOND BLANC) */}
            <div className="abstract-arcade">
              <div className="header-line">
                <span className="serial">ARC-AUTH-v2.0</span>
                <div className="pulse-dot" />
              </div>

              <div className="main-display">
                <div className="screen-content">
                  <div className="scan-bar" />
                  <div className="auth-status">
                    <span className="label">SÉQUENCE REQUISE</span>
                    <div className="dots-container">
                      {CHEAT_CODE.map((_, i) => (
                        <div key={i} className={`dot ${typedCode.length > i ? 'active' : ''}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="footer-controls">
                <div className="geo-shape" />
                <span className="instruction">WAITING FOR INPUT...</span>
              </div>

              {/* POST-IT INDICE */}
              <div className="post-it">
                <span className="pin">📍</span>
                <p className="hint-text">
                  → ← <br />
                  <strong>ARCADES</strong> <br />
                  ← →
                </p>
              </div>
            </div>

            {/* CLAVIER AZERTY DESIGN */}
            <div className="keyboard-minimal">
              {azertyRows.map((row, i) => (
                <div key={i} className="k-row">
                  {row.map(k => (
                    <div key={k} className={`key ${activeKey === k ? 'active' : ''} ${k.includes('arrow') ? 'arrow-key' : ''}`}>
                      {k === 'arrowleft' ? '←' : k === 'arrowright' ? '→' : k === 'arrowup' ? '↑' : k === 'arrowdown' ? '↓' : k.toUpperCase()}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* SECTION HERO CLASSIQUE */
          <motion.div 
            key="hero-main"
            className="hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
                <span>SCROLLEZ POUR JOUER</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroArcades;