import { Reveal } from "../components/layout/Reveal";
import MysteryBlock from "../components/utils/MysteryBlock";
import fondPS from "../assets/fondPS.mp4";
import "./Presentation.scss";

const Presentation = () => {
  return (
    <section className="presentation-section">
      <video className="bg-video" autoPlay loop muted playsInline>
        <source src={fondPS} type="video/mp4" />
      </video>

      <div className="container">
        <Reveal>
          <h2 className="section-title">MODE HISTOIRE</h2>
          <div className="section-line"></div>
        </Reveal>

        <div className="block-container">
          <Reveal>
            <div className="about-card">
              <MysteryBlock content="?" />
              <div className="text-aboutMe">
                <div className="label" data-text="ORIGIN_STORY">
                  ORIGIN_STORY
                </div>
                <h3>Animateur Péri/Extra-Scolaire</h3>
                <p>
                  Mon voyage a débuté sur le terrain de l'
                  <strong>animation péri et extra-scolaire</strong>. J'y ai
                  appris l'essentiel : capter l'attention, transmettre un savoir
                  et structurer des moments de vie. Cette expérience humaine est
                  la fondation de ma capacité à concevoir des projets centrés
                  sur l'utilisateur.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="about-card">
              <MysteryBlock content="?" />
              <div className="text-aboutMe">
                <div className="label" data-text="CURRENT_QUEST">
                  CURRENT_QUEST
                </div>
                <h3>Magicien du Code</h3>
                <p>
                  Je ne parle pas de mon diplôme en prestidigitation mais de ma
                  créativité et de mon apprentissage technique de{" "}
                  <strong>React</strong> et <strong>JAVA</strong>. Je construis
                  ainsi ma boîte à outils de développeur avec la même rigueur
                  que je prépare mes grands jeux avec les enfants.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="about-card">
              <MysteryBlock content="?" />
              <div className="text-aboutMe">
                <div className="label" data-text="CORE_VALUES">
                  CORE_VALUES
                </div>
                <h3>Instruire & Divertir</h3>
                <p>
                  Ma philosophie ?{" "}
                  <em>
                    "Le conte seul apporte l'ennui, le conte fait passer le
                    précepte avec lui."
                  </em>{" "}
                  Sur mon temps libre, je cultive cet équilibre : que ce soit à
                  travers le jeu ou la création, je crois fermement qu'une
                  application réussie doit être aussi{" "}
                  <strong>instructive</strong> que{" "}
                  <strong>divertissante</strong>.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Presentation;
