import BackgroundParticles from "../components/utils/BackgroundParticles";
import { Reveal } from "../components/layout/Reveal";
import BtnContact from "../components/utils/BtnContact";
import BtnGhost from "../components/utils/BtnGhost";
import "./HeroArcades.scss";

const HeroArcades = () => {
  return (
    <section className="hero-arcades">
      <BackgroundParticles />
      <div className="hero-content">
        <Reveal>
          <div className="pixel-label">SYSTEM: READY</div>
        </Reveal>

        <Reveal>
          <h1 className="hero-title">
            BIENVENUE AUX <span className="pixel-text">ARCADES</span>
          </h1>
        </Reveal>

        <Reveal>
          <p className="hero-subtitle">
            Plongez dans l'univers de mes réalisations. <br />A chaque jeu ses
            compétences.
          </p>
        </Reveal>

        <Reveal>
          <div className="hero-actions">
            <BtnContact to="/histoire">SELECT HISTOIRE</BtnContact>
            <BtnGhost to="/contact">SELECT PROJECTS</BtnGhost>
          </div>
        </Reveal>

        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <span>PRESS START TO PLAY !</span>
        </div>
      </div>
    </section>
  );
};

export default HeroArcades;
