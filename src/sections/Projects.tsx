import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../data/supabaseClient";
import { Reveal } from "../components/layout/Reveal";
import BackgroundParticles from "../components/utils/BackgroundParticles";
import BtnGhost from "../components/utils/BtnGhost";
import BtnContact from "../components/utils/BtnContact";
import "./Projects.scss";

interface Project {
  id: number;
  tag: string;
  title: string;
  description: string;
  tech: string[];
  details: string;
}

function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("Projects")
        .select("*")
        .order("id", { ascending: true });

      if (data && !error) {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (title: string) => {
    navigate(`/arcades/${title.toLowerCase()}`);
  };

  return (
    <section className="projects-arcade">
      <BackgroundParticles />
      <div className="arcade-inner">
        <Reveal>
          <div className="terminal-header">
            <h2 className="glitch-title" data-text="PROJETS">
              PROJETS
            </h2>
            <div className="header-line"></div>
            <p className="terminal-bio">
              Bienvenue dans les <strong>arcades</strong>. Chaque projet est une
              itération optimisée entre
              <strong> performance technique</strong> et{" "}
              <strong>design réflechi</strong>. Analysez mes réalisations et
              découvrez mon univers.
            </p>
            <div className="btns">
              <BtnContact to="/histoire">SELECT HISTOIRE</BtnContact>
              <BtnGhost to="/contact">SELECT CONTACT</BtnGhost>
            </div>
          </div>
        </Reveal>

        <div className="projects-grid">
          {projects.map((project) => (
            <Reveal key={project.id}>
              <div className="project-wrapper">
                <div className="project-card">
                  <div className="card-scanner"></div>

                  <div className="card-top">
                    <span className="tier-badge">{project.tag}</span>
                    <span className="class-label">
                      #{project.id.toString().padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="project-name">{project.title}</h3>

                  <p className="project-desc">{project.description}</p>

                  {project.tech && project.tech.length > 0 && (
                    <div className="tech-tags">
                      {project.tech.slice(0, 3).map((tech, i) => (
                        <span key={i} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
