import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import nécessaire pour la Home
import { Reveal } from "../components/layout/Reveal";
import BackgroundParticles from "../components/utils/BackgroundParticles";
import BtnContact from "../components/utils/BtnContact";
import BtnGhost from "../components/utils/BtnGhost";
import "./LevelSelect.scss";

export type LevelData = {
  id: number | string;
  tag: string;
  title: string;
  description: string;
  details: string;
  tech: string[];
  link: string;
};

interface LevelSelectProps {
  data: LevelData[];
  sectionTitle: string;
  sectionContext: string;
  mainBtnLabel: string;
  isExternal?: boolean;
}

function LevelSelect({
  data,
  sectionTitle,
  sectionContext,
  mainBtnLabel,
  isExternal = false,
}: LevelSelectProps) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  if (!data || data.length === 0) return null;

  const current = data[index];
  const next = () => setIndex((index + 1) % data.length);
  const prev = () => setIndex((index - 1 + data.length) % data.length);

  const handleAction = () => {
    if (isExternal) {
      // Force l'ouverture dans un nouvel onglet pour tout (y compris mailto)
      window.open(current.link, "_blank", "noopener,noreferrer");
    } else {
      // Navigation sur la même page (pour la Home)
      navigate(current.link);
    }
  };

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
                      <p>{current.description}</p>
                    </div>
                  </div>
                </div>
                <div className="interface">
                  <div className="d-pad">
                    <button className="up"></button>
                    <button className="left" onClick={prev}></button>
                    <button className="right" onClick={next}></button>
                    <button className="down"></button>
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
                <h2>{sectionTitle}</h2>
                <p className="context">{sectionContext}</p>
                <BtnGhost to="/arcades">RETOUR INVENTAIRE</BtnGhost>
              </div>
            </Reveal>

            <Reveal>
              <div className="specs-block">
                <h3>Infos supplémentaires</h3>
                <p className="long-desc">{current.details}</p>
                <div className="inventory">
                  {current.tech.map((t, i) => (
                    <span
                      key={i}
                      className="tech-badge"
                      style={{ animationDelay: `${i * 0.05}s` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {/* On déclenche handleAction au clic sur le conteneur du bouton */}
                <div
                  onClick={handleAction}
                  style={{ cursor: "pointer", display: "inline-block" }}
                >
                  <BtnContact to="#">{mainBtnLabel}</BtnContact>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LevelSelect;