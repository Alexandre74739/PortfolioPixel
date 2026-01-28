import Hero from "../sections/Hero";
import EasterEgg from "../sections/SpaceManifesto";
import Skills from "../sections/Skills";
import Presentation from "../sections/Presentation";
import LevelSelect from "../sections/LevelSelect";

function Home() {
    return (
        <div>
            <Hero />
            <EasterEgg />
            <Skills />
            <LevelSelect />
        </div>
    );
}

export default Home;