import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

export const Reveal = ({ children }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Départ : invisible et un peu plus bas
      whileInView={{ opacity: 1, y: 0 }} // Quand on scrolle dessus : visible et remonte
      viewport={{ once: true, amount: 0.2 }} // L'animation se joue une seule fois quand 20% de l'élément est visible
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};