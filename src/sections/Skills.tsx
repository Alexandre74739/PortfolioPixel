import "./Skills.scss";
import BtnGhost from "../components/utils/BtnGhost";
import BtnContact from "../components/utils/BtnContact";
import BackgroundParticles from "../components/utils/BackgroundParticles";
import { Reveal } from "../components/layout/Reveal";

function Skills() {
  const skillsData = [
    {
      id: "react",
      name: "REACT.JS",
      tier: "S-RANK",
      xp: "80%",
      desc: "Interface dynamique & hooks personnalisés.",
      class: "dpt",
    },
    {
      id: "uxui",
      name: "UX / UI",
      tier: "A-RANK",
      xp: "80%",
      desc: "Design system & psychologie neurocognitive.",
      class: "support",
    },
    {
      id: "java",
      name: "JAVA",
      tier: "B-RANK",
      xp: "60%",
      desc: "Backend robuste & micro-services.",
      class: "tank",
    },
  ];

  return (
    <section className="skills-arcade">
      <BackgroundParticles />
      <div className="arcade-inner">
        <Reveal>
          <div className="terminal-header">
            <h2 className="glitch-title" data-text="CAPABILITIES">
              COMPÉTENCES
            </h2>
            <div className="header-line"></div>
            <p className="terminal-bio">
              <span className="prompt">{">"}</span> Développeur passionné par{" "}
              <strong>l'animation</strong>, l'alliance entre
              <strong> l'esthétique rétro</strong> et les{" "}
              <strong>performances modernes</strong>. Je conçois des interfaces
              autant ludique que pertinente pour transformer chaque projet en
              une expérience inoubliable.
            </p>
          </div>
        </Reveal>

        <div className="skills-grid">
          {skillsData.map((skill) => (
            /* On enveloppe chaque itération dans un Reveal */
            <Reveal key={skill.id}>
              <div className="skill-wrapper">
                <div className={`skill-card ${skill.class}`}>
                  <div className="card-scanner"></div>
                  <div className="card-top">
                    <span className="tier-badge">{skill.tier}</span>
                    <span className="class-label">
                      {skill.class.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="skill-name">{skill.name}</h3>

                  <div className="xp-container">
                    <div className="xp-bar">
                      <div
                        className="xp-fill"
                        style={{ width: skill.xp }}
                      ></div>
                    </div>
                    <span className="xp-percent">{skill.xp}</span>
                  </div>

                  <p className="skill-desc">{skill.desc}</p>
                </div>

                <div className="skill-actions">
                  <BtnGhost to="/">SELECT HISTOIRE</BtnGhost>
                  <BtnContact to={`/arcades/${skill.id}`}>
                    SELECT PROJECTS
                  </BtnContact>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
