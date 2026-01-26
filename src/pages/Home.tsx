import Hero from "../sections/Hero";
import Skills from "../sections/Skills";
import Presentation from "../sections/Presentation";
import LevelSelect from "../sections/LevelSelect";

function Home() {
    return (
        <div>
            <Hero />
            <Skills />
            <Presentation />
            <LevelSelect />
        </div>
    );
}

export default Home;