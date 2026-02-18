import LevelSelect, { type LevelData } from "../sections/LevelSelect";

function Contact() {
  const contactMethods: LevelData[] = [
    {
      id: 1,
      tag: "01_MAIL",
      title: "Email",
      description: "Disponible pour vos futurs recrutements et projets.",
      details:
        "Je réponds généralement en moins de 24h. Idéal pour les demandes formelles ou les collaborations long terme.",
      tech: [],
      link: "mailto:perezalexandre430@gmail.com",
    },
    {
      id: 2,
      tag: "02_LINK",
      title: "Linkedin",
      description: "Connectons-nous sur mon réseau professionnel.",
      details:
        "Vous y trouverez mon parcours complet, mes compétences et surtout mes posts sur le développement web et l'animation.",
      tech: [],
      link: "https://www.linkedin.com/in/alexandre74739/",
    },
    {
      id: 3,
      tag: "03_CODE",
      title: "GitHub",
      description: "Explorez ma façon de coder dans mes repositories.",
      details:
        "Mes projets personnels, mes expériences techniques et plus globalement ma manière d'apprendre et de développer.",
      tech: [],
      link: "https://github.com/Alexandre74739",
    },
  ];

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div
      className="contact-page"
      style={{ marginTop: isMobile ? "80px" : "24px" }}
    >
      <LevelSelect
        data={contactMethods}
        sectionTitle="CONTACTEZ-MOI"
        sectionContext="Utilisez la console pour naviguer entre les différents moyens de me joindre."
        mainBtnLabel="OUVRIR LA CONNEXION"
      />
    </div>
  );
}

export default Contact;
