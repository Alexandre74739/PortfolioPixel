import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../data/supabaseClient";
import { Reveal } from "../components/layout/Reveal";
import BackgroundParticles from "../components/utils/BackgroundParticles";
import BtnGhost from "../components/utils/BtnGhost";
import BtnContact from "../components/utils/BtnContact";
import "./ProjectDetail.scss";

interface SpecifiqueProject {
  id: number;
  title: string;
  description: string | null;
  contexte: string | null;
  objectifs: string | null;
  cibles: string | null;
  contraintes: string | null;
  illustrations: string[] | null;
  lien: string | null;
}

function ProjectDetail() {
  const { projectName } = useParams<{ projectName: string }>();
  const [details, setDetails] = useState<SpecifiqueProject | null>(null);
  const [error, setError] = useState(false);
  const [currentIllustration, setCurrentIllustration] = useState(0);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!projectName) return;

      const { data, error: fetchError } = await supabase
        .from("SpecifiqueProject")
        .select("*")
        .ilike("title", projectName)
        .single();

      if (fetchError || !data) {
        setError(true);
        return;
      }

      setDetails(data);
    };
    fetchProjectDetails();
  }, [projectName]);

  // Gère les cas d'erreurs
  if (error || !details)
    return (
      <section className="project-detail">
        <BackgroundParticles />
        <div className="error-screen">
          <div className="error-glitch" data-text="ERROR_404">
            ERROR_404
          </div>
          <BtnContact to="/arcades">RETOUR AUX ARCADES</BtnContact>
        </div>
      </section>
    );

  return (
    <section className="project-detail">
      <BackgroundParticles />

      <div className="detail-container">
        <Reveal>
          <div className="hero-arcade">
            <h1 className="project-title-hero" data-text={details.title}>
              {details.title}
            </h1>
            {details.lien && (
              <a
                href={details.lien}
                target="_blank"
                rel="noopener noreferrer"
                className="radar-link-module"
              >
                <div className="radar-ping"></div>
                <div className="radar-content">
                  <span className="status-label">LIVE_PREVIEW : </span>
                  <span className="secret-coord">{details.title}</span>
                </div>
              </a>
            )}
          </div>
        </Reveal>

        <div className="blocks-stack">
          {details.description && (
            <Reveal>
              <div className="data-block">
                <div className="coord">[01] DESCRIPTION</div>
                <p className="section-text">{details.description}</p>
              </div>
            </Reveal>
          )}

          {details.contexte && (
            <Reveal>
              <div className="data-block">
                <div className="coord">[02] CONTEXTE</div>
                <p className="section-text">{details.contexte}</p>
              </div>
            </Reveal>
          )}
        </div>

        {details.objectifs && (
          <Reveal>
            <div className="data-block objectives-block">
              <div className="coord">[03] MISSION_OBJECTIVES</div>
              <div className="objectifs-content">
                <span className="arcade-icon">🎯</span>
                <p className="section-text">{details.objectifs}</p>
              </div>
            </div>
          </Reveal>
        )}

        <div className="grid-section">
          {details.cibles && (
            <Reveal>
              <div className="data-block">
                <div className="coord">[04] CIBLES</div>
                <p className="section-text">{details.cibles}</p>
              </div>
            </Reveal>
          )}

          {details.contraintes && (
            <Reveal>
              <div className="data-block">
                <div className="coord">[05] CONTRAINTES</div>
                <p className="section-text">{details.contraintes}</p>
              </div>
            </Reveal>
          )}
        </div>

        {details.illustrations && details.illustrations.length > 0 && (
          <Reveal>
            <div className="data-block gallery-block">
              <div className="coord">[06] VISUAL_DATA</div>
              <div className="gallery-main">
                <img
                  src={details.illustrations[currentIllustration]}
                  alt="Gallery"
                />
                {details.illustrations.length > 1 && (
                  <div className="gallery-nav">
                    <button
                      onClick={() =>
                        setCurrentIllustration((prev) =>
                          prev === 0
                            ? details.illustrations!.length - 1
                            : prev - 1,
                        )
                      }
                    >
                      ◀
                    </button>
                    <div className="gallery-counter">
                      {currentIllustration + 1} / {details.illustrations.length}
                    </div>
                    <button
                      onClick={() =>
                        setCurrentIllustration((prev) =>
                          prev === details.illustrations!.length - 1
                            ? 0
                            : prev + 1,
                        )
                      }
                    >
                      ▶
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        )}

        <div className="detail-footer">
          <BtnGhost to="/arcades">◀ SYSTEM_EXIT</BtnGhost>
        </div>
      </div>
    </section>
  );
}

export default ProjectDetail;
