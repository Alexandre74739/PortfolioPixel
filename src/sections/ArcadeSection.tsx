import React, { useState } from 'react';

interface ArcadeProps {
  onCrash: () => void;
}

export const ArcadeSection = ({ onCrash }: ArcadeProps) => {
  const [isOver, setIsOver] = useState(false);

  return (
    <section className="arcade-cabinet-section">
      <div className="cabinet-container">
        <p>SYSTÈME STABLE - INSÉRER JETON POUR TESTER LA RÉSISTANCE</p>
        
        <div className="interaction-zone">
          {/* Le Coin */}
          <div 
            className="arcade-coin" 
            draggable 
            onDragStart={(e) => e.dataTransfer.setData("text", "coin")}
          >
            ●
          </div>

          {/* La Fente */}
          <div 
            className={`arcade-slot ${isOver ? 'hover' : ''}`}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setIsOver(true)}
            onDragLeave={() => setIsOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              onCrash();
            }}
          >
            <span>SLOT</span>
          </div>
        </div>
      </div>

      <style>{`
        .arcade-cabinet-section {
          display: none;
          @media (min-width: 769px) {
            display: flex; flex-direction: column; align-items: center;
            padding: 60px; border-top: 1px solid var(--color-border);
          }
        }
        .interaction-zone { display: flex; gap: 50px; align-items: center; margin-top: 30px; }
        .arcade-coin { 
            width: 60px; height: 60px; background: #FFD700; border-radius: 50%; 
            display: flex; align-items: center; justify-content: center;
            cursor: grab; font-size: 2rem; border: 4px double #B8860B;
            box-shadow: 0 0 15px rgba(255, 215, 0, 0.4);
        }
        .arcade-slot { 
            width: 120px; height: 40px; background: #000; border: 2px solid #FF5F5F;
            display: flex; align-items: center; justify-content: center;
            color: #FF5F5F; font-weight: bold; transition: 0.3s;
        }
        .arcade-slot.hover { background: #FF5F5F; color: #000; box-shadow: 0 0 20px #FF5F5F; }
      `}</style>
    </section>
  );
};