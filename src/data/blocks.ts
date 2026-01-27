// Sert à lister mes block dans JeuxAbout.tsx
export interface Block {
  id: string;
  label: string;
  color: "blue" | "violet" | "yellow" | "green" | "red" | "orange";
  shape: "t-shape" | "i-shape" | "o-shape" | "s-shape" | "l-shape" | "z-shape";
  text: string;
}

export const library: Block[] = [
  {
    id: "react",
    label: "REACT",
    color: "blue",
    shape: "t-shape",
    text: "Développement d’interfaces dynamiques avec React 18+.",
  },
  {
    id: "ts",
    label: "TS",
    color: "violet",
    shape: "i-shape",
    text: "Architecture typée pour un code robuste et auto-documenté.",
  },
  {
    id: "node",
    label: "NODE",
    color: "yellow",
    shape: "o-shape",
    text: "Construction d’APIs performantes et scalables.",
  },
  {
    id: "sql",
    label: "SQL",
    color: "green",
    shape: "s-shape",
    text: "Modélisation de bases de données relationnelles complexes.",
  },
  {
    id: "ux",
    label: "UX/UI",
    color: "red",
    shape: "l-shape",
    text: "Conception orientée utilisateur et prototypage Figma.",
  },
  {
    id: "git",
    label: "GIT",
    color: "orange",
    shape: "z-shape",
    text: "Gestion de version et workflow collaboratif (GitFlow).",
  },
  {
    id: "next",
    label: "NEXT",
    color: "blue",
    shape: "i-shape",
    text: "Optimisation SEO et Server Side Rendering.",
  },
  {
    id: "sass",
    label: "SASS",
    color: "violet",
    shape: "t-shape",
    text: "Stylisation modulaire et maintenance CSS facilitée.",
  },
  {
    id: "docker",
    label: "DOCKER",
    color: "yellow",
    shape: "o-shape",
    text: "Conteneurisation d’applications pour des déploiements isolés.",
  },
  {
    id: "prisma",
    label: "PRISMA",
    color: "green",
    shape: "s-shape",
    text: "ORM moderne pour une communication fluide avec la DB.",
  },
  {
    id: "jest",
    label: "JEST",
    color: "red",
    shape: "l-shape",
    text: "Tests unitaires pour garantir la non-régression.",
  },
  {
    id: "strapi",
    label: "STRAPI",
    color: "orange",
    shape: "z-shape",
    text: "Gestion de contenu via Headless CMS.",
  },
  {
    id: "redux",
    label: "REDUX",
    color: "blue",
    shape: "t-shape",
    text: "Gestion d’états globaux complexes.",
  },
  {
    id: "api",
    label: "REST",
    color: "violet",
    shape: "i-shape",
    text: "Conception de routes et documentation Swagger.",
  },
  {
    id: "framer",
    label: "FRAMER",
    color: "yellow",
    shape: "o-shape",
    text: "Animations fluides et interactions avancées.",
  },
  {
    id: "mongo",
    label: "MONGO",
    color: "green",
    shape: "s-shape",
    text: "Flexibilité des bases de données NoSQL.",
  },
  {
    id: "agile",
    label: "AGILE",
    color: "red",
    shape: "l-shape",
    text: "Méthodologie Scrum et gestion de projet Kanban.",
  },
  {
    id: "python",
    label: "PYTHON",
    color: "orange",
    shape: "z-shape",
    text: "Scripts d’automatisation et analyse de données.",
  },
  {
    id: "aws",
    label: "AWS",
    color: "blue",
    shape: "t-shape",
    text: "Déploiement Cloud et services S3/EC2.",
  },
  {
    id: "linux",
    label: "LINUX",
    color: "violet",
    shape: "i-shape",
    text: "Administration serveur et scripting Bash.",
  },
];
