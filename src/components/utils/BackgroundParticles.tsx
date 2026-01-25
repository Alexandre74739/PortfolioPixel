import React from "react";
import "./BackgroundParticles.scss";

interface ParticleData {
  id: number;
  left: string;
  top: string;
  delay: string;
}

const COUNT_STARS = 16;
const COUNT_COINS = 12;

const STARS: ParticleData[] = Array.from({ length: COUNT_STARS }, (_, i) => ({
  id: i,
  left: `${Math.floor(Math.random() * 100)}%`,
  top: `${Math.floor(Math.random() * 100)}%`,
  delay: `${(Math.random() * 3).toFixed(2)}s`,
}));

const COINS: ParticleData[] = Array.from({ length: COUNT_COINS }, (_, i) => ({
  id: i,
  left: `${Math.floor(Math.random() * 100)}%`,
  top: `${Math.floor(Math.random() * 100)}%`,
  delay: `${(Math.random() * 5).toFixed(2)}s`,
}));

const BackgroundParticles: React.FC = () => {
  return (
    <div className="particles-wrapper">
      {/* Étoiles */}
      {STARS.map((s) => (
        <div
          key={`star-${s.id}`}
          className="particle-star"
          style={{
            left: s.left,
            top: s.top,
            animationDelay: s.delay,
          }}
        />
      ))}
      
      {/* Pièces */}
      {COINS.map((c) => (
        <div
          key={`coin-${c.id}`}
          className="particle-coin"
          style={{
            left: c.left,
            top: c.top,
            animationDelay: c.delay,
          }}
        >
          $
        </div>
      ))}
    </div>
  );
};

export default BackgroundParticles;