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
    text: "Développement d’interfaces dynamiques avec React.",
  },
  {
    id: "ts",
    label: "TS",
    color: "yellow",
    shape: "i-shape",
    text: "Architecture typée pour un code robuste.",
  },
  {
    id: "ux",
    label: "UX / UI",
    color: "red",
    shape: "l-shape",
    text: "Conception orientée utilisateur et prototypage Figma.",
  },
  {
    id: "git",
    label: "GIT",
    color: "orange",
    shape: "z-shape",
    text: "Gestion de version et travail collaboratif.",
  },
  {
    id: "sass",
    label: "SASS",
    color: "violet",
    shape: "t-shape",
    text: "Stylisation modulaire et maintenance CSS facilitée.",
  },
  {
    id: "Supabase",
    label: "SUPABASE",
    color: "orange",
    shape: "z-shape",
    text: "Gestion de contenu via base de données.",
  },
  {
    id: "java",
    label: "JAVA",
    color: "blue",
    shape: "t-shape",
    text: "Programmation orienté objet.",
  },
  {
    id: "framer",
    label: "FRAMER",
    color: "yellow",
    shape: "o-shape",
    text: "Animations fluides avec de multiples interactions.",
  },
  {
    id: "agile",
    label: "AGILE",
    color: "red",
    shape: "l-shape",
    text: "Méthodologie Agile organisé en sprints.",
  },
  {
    id: "linux",
    label: "LINUX",
    color: "violet",
    shape: "i-shape",
    text: "Administration serveur et scripting Bash sous Ubunto.",
  },
];