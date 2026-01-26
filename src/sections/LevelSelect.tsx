import { useState } from "react";
import { Reveal } from "../components/layout/Reveal";
import BackgroundParticles from "../components/utils/BackgroundParticles";
import BtnContact from "../components/utils/BtnContact";
import BtnGhost from "../components/utils/BtnGhost";
import "./LevelSelect.scss";

const categories = [
  {
    id: 0,
    title: "REACT",
    tag: "FRONTEND",
    desc: "Architecture de composants et interfaces dynamiques ultra-performantes.",
    details:
      "Maîtrise du Virtual DOM, des Hooks personnalisés et de l'optimisation du rendu pour une UX fluide.",
    tech: ["React", "TypeScript", "Framer", "Sass"],
  },
  {
    id: 1,
    title: "UX / UI",
    tag: "DESIGN",
    desc: "Conception centrée utilisateur et prototypes interactifs.",
    details:
      "Création de parcours intuitifs, respect des normes d'accessibilité.",
    tech: ["Figma", "Testing", "UI/UX", "Prototyping"],
  },
  {
    id: 2,
    title: "JAVA_CORE",
    tag: "BACKEND",
    desc: "Programmation orientée objet et architectures typée robustes.",
    details: "Conception de mini jeux",
    tech: ["Java"],
  },
];

function LevelSelect() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % categories.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + categories.length) % categories.length);

  const current = categories[index];

  return (
    <section className="levelSelect">
      <BackgroundParticles />

      <div className="fixed-wrapper">
        <div className="main-grid">
          <Reveal>
            <div className="console-column">
              <div className="gb-body">
                <div className="screen-area">
                  <div className="lcd">
                    <div className="scanlines"></div>
                    <div className="lcd-content">
                      <span className="type-label">{current.tag}</span>
                      <h3>{current.title}</h3>
                      <p>{current.desc}</p>
                    </div>
                  </div>
                </div>

                <div className="interface">
                  <div className="d-pad">
                    <button className="up" onClick={() => {}}></button>
                    <button className="left" onClick={prev}></button>
                    <button className="right" onClick={next}></button>
                    <button className="down" onClick={() => {}}></button>
                  </div>

                  <div className="action-btns">
                    <button className="btn-b" onClick={prev}>
                      <span>◀</span>
                    </button>
                    <button className="btn-a" onClick={next}>
                      <span>▶</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="content-column">
            <Reveal>
              <div className="info-block">
                <h2>MODE PROJETS</h2>
                <p className="context">
                  Le code n'est qu'un langage, mais l'expérience est l'histoire
                  que je raconte. Je fusionne mon expérience de développeur et
                  d'animateur pour donner vie à à mes projets.
                </p>
                <BtnGhost to="/arcades">SELECT PROJECTS</BtnGhost>
              </div>
            </Reveal>

            <Reveal>
              <div className="specs-block">
                <h3>Prêt à commencer l'aventure</h3>
                <p className="long-desc">{current.details}</p>

                <div className="inventory">
                  {current.tech.map((t, i) => (
                    <span
                      key={t}
                      className="tech-badge"
                      style={{ animationDelay: `${i * 0.05}s` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <BtnContact to="/arcades/">SEE MORE</BtnContact>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LevelSelect;
