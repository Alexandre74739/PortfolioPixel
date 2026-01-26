import "./Skills.scss";
import BtnGhost from "../components/utils/BtnGhost";
import BtnContact from "../components/utils/BtnContact";
import BackgroundParticles from "../components/utils/BackgroundParticles";

function Skills() {
  const skillsData = [
    {
      id: "react",
      name: "REACT.JS",
      tier: "S-RANK",
      xp: "90%",
      desc: "Interface atomique & hooks personnalisés.",
      class: "striker",
    },
    {
      id: "uxui",
      name: "UX / UI",
      tier: "A-RANK",
      xp: "85%",
      desc: "Design system & psychologie cognitive.",
      class: "support",
    },
    {
      id: "java",
      name: "JAVA",
      tier: "B-RANK",
      xp: "80%",
      desc: "Backend robuste & micro-services.",
      class: "tank",
    },
  ];

  return (
    <section className="skills-arcade">
      <BackgroundParticles />
      <div className="arcade-inner">
        <div className="terminal-header">
          <h2 className="glitch-title" data-text="CAPABILITIES">
            COMPÉTENCES
          </h2>
          <div className="header-line"></div>
          <p className="terminal-bio">
            <span className="prompt">{">"}</span> Développeur passionné par
            l'alliance entre
            <strong> l'esthétique rétro</strong> et les{" "}
            <strong>performances modernes</strong>. Je conçois des interfaces
            vibrantes pour transformer chaque projet en une expérience
            mémorable.
          </p>
        </div>

        <div className="skills-grid">
          {skillsData.map((skill) => (
            <div key={skill.id} className="skill-wrapper">
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
                    <div className="xp-fill" style={{ width: skill.xp }}></div>
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
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
