import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundParticles from "../components/utils/BackgroundParticles";
import { Reveal } from "../components/layout/Reveal";
import BtnContact from "../components/utils/BtnContact";
import BtnGhost from "../components/utils/BtnGhost";
import "./HeroArcades.scss";

// Code : A R C A D E
const CHEAT_CODE = ['a', 'r', 'c', 'a', 'd', 'e'];

const HeroArcades = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [typedCode, setTypedCode] = useState<string[]>([]);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  // Bloquer le scroll tant que ce n'est pas déverrouillé
  useEffect(() => {
    if (!isUnlocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isUnlocked]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isUnlocked) return;
      const key = e.key.toLowerCase();
      
      setActiveKey(key);
      setTimeout(() => setActiveKey(null), 150);

      setTypedCode(prev => {
        const newCode = [...prev, key];
        // On vérifie si les dernières touches correspondent au code
        const currentString = newCode.join("");
        if (currentString.includes("arcade")) {
          setIsUnlocked(true);
          return [];
        }
        // Garder seulement les 6 dernières touches pour la performance
        return newCode.slice(-6);
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isUnlocked]);

  const azertyKeys = [
    ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'],
    ['w', 'x', 'c', 'v', 'b', 'n']
  ];

  return (
    <section className={`hero-arcades-cheat ${isUnlocked ? "unlocked" : "locked"}`}>
      <BackgroundParticles />

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div 
            key="lock-screen"
            className="lock-overlay"
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
          >
            <div className="monitor-minimal">
              <div className="screen">
                <div className="interface">
                  <span className="secure-tag">SYSTEM_LOCKED</span>
                  <div className="input-visualizer">
                    {typedCode.map((char, i) => (
                      <motion.span initial={{scale:0}} animate={{scale:1}} key={i}>*</motion.span>
                    ))}
                    <span className="blink">_</span>
                  </div>
                  <p className="status-msg">SAISISSEZ LE MOT DE PASSE</p>
                </div>
              </div>
              
              {/* Le Post-it avec l'indice */}
              <div className="post-it">
                <span className="pin">📌</span>
                <p>CODE :</p>
                <p className="hint-word">A _ _ _ _ E</p>
              </div>
            </div>

            {/* Clavier AZERTY Minimaliste */}
            <div className="azerty-keyboard">
              {azertyKeys.map((row, i) => (
                <div key={i} className="k-row">
                  {row.map(k => (
                    <div key={k} className={`key ${activeKey === k ? 'active' : ''}`}>
                      {k.toUpperCase()}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="hero-content"
            className="hero-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Reveal><div className="pixel-label">ACCÈS AUTORISÉ</div></Reveal>
            <Reveal>
              <h1 className="hero-title">
                BIENVENUE AUX <span className="pixel-text">ARCADES</span>
              </h1>
            </Reveal>
            <Reveal>
              <p className="hero-subtitle">
                Plongez dans l'univers de mes réalisations. <br />
                A chaque jeu ses compétences.
              </p>
            </Reveal>
            <Reveal>
              <div className="hero-actions">
                <BtnContact to="/histoire">SELECT HISTOIRE</BtnContact>
                <BtnGhost to="/contact">SELECT PROJECTS</BtnGhost>
              </div>
            </Reveal>
            <div className="scroll-indicator">
              <span>EXPLOREZ LE CONTENU</span>
              <div className="mouse"><div className="wheel"></div></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroArcades;