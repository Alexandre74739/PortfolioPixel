import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Hero from "../sections/Hero";
import EasterEgg from "../sections/SpaceManifesto";
import Skills from "../sections/Skills";
import LevelSelect from "../sections/LevelSelect";

const supabase = createClient(
  "https://ehqrctyduhhiesscpxlc.supabase.co",
  "sb_publishable_d3PLocPLQdML-l7IPTKNEA_4dDwog0b",
);

function Home() {
  const [projects, setProjects] = useState<LevelData[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("Projects")
        .select("*")
        .order("id", { ascending: true });

      if (data && !error) {
        // On adapte les données Supabase au format LevelData attendu par le composant
        const formattedData = data.map((p: any) => ({
          id: p.id,
          tag: p.tag,
          title: p.title,
          description: p.description,
          details: p.details,
          tech: p.tech || [],
          link: `/arcades/${p.title.toLowerCase()}`,
        }));
        setProjects(formattedData);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <Hero />
      <EasterEgg />
      <Skills />
      {/* On ne l'affiche que si les projets sont chargés */}
      {projects.length > 0 && (
        <LevelSelect
          data={projects}
          sectionTitle="MODE PROJETS"
          sectionContext="Exploration des archives numériques. Sélectionnez un projet pour voir les détails techniques."
          mainBtnLabel="EXPLORER LE PROJET"
        />
      )}
    </div>
  );
}

export default Home;