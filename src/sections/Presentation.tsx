import React from 'react';
import BackgroundParticles from '../components/utils/BackgroundParticles';
import { Reveal } from "../components/layout/Reveal";
import MysteryBlock from '../components/utils/MysteryBlock';
import './Presentation.scss';

const Presentation = () => {
  return (
    <section className="presentation-section">
      <BackgroundParticles />

      <Reveal>
        <h1>A PROPOS DE MOI</h1>
        <MysteryBlock content="?" />
      </Reveal>

    </section>
  );
};

export default Presentation;