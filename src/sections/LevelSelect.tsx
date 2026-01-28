import { useState, useEffect } from "react";
import { Reveal } from "../components/layout/Reveal";
import { createClient } from "@supabase/supabase-js";
import BackgroundParticles from "../components/utils/BackgroundParticles";
import BtnContact from "../components/utils/BtnContact";
import BtnGhost from "../components/utils/BtnGhost";
import "./LevelSelect.scss";

const supabase = createClient(
  "https://ehqrctyduhhiesscpxlc.supabase.co",
  "sb_publishable_d3PLocPLQdML-l7IPTKNEA_4dDwog0b",
);

type Project = {
  id: number;
  tag: string;
  title: string;
  description: string;
  details: string;
  tech: string[];
  site_url: string;
};

function LevelSelect() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    supabase
      .from("Projects") // Cible la table nommée Projects
      .select("*") // Demande de récupérer toutes les colonnes
      .order("id", { ascending: true }) // Trie les projets par leur identifiant (du plus petit au plus grand)
      .then(({ data }) => setProjects(data || []));
  }, []);

  const next = () => setIndex((index + 1) % projects.length);
  const prev = () => setIndex((index - 1 + projects.length) % projects.length);

  // Empêcher le rendu si les données ne sont pas là
  if (!projects || projects.length === 0) {
    return;
  }

  const current = projects[index];

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
                <h2>MODE PROJETS</h2>
                <p className="context">
                  Exploration des archives numériques. Sélectionnez un projet
                  pour voir les détails techniques et les liens de déploiement.
                </p>
                <BtnGhost to="/arcades">INVENTAIRE CARTOUCHES</BtnGhost>
              </div>
            </Reveal>

            <Reveal>
              <div className="specs-block">
                <h3>Détails techniques</h3>
                <p className="long-desc">{current.details}</p>

                <div className="inventory">
                  {current.tech &&
                    current.tech.map((t, i) => (
                      <span
                        key={i}
                        className="tech-badge"
                        style={{ animationDelay: `${i * 0.05}s` }}
                      >
                        {t}
                      </span>
                    ))}
                </div>

                <BtnContact to={`/arcades/${current.title.toLowerCase()}`}>EXPLORER LE PROJET</BtnContact>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LevelSelect;
