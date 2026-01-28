import React, { useState } from "react";
import "./JeuxAbout.scss";
import { TetrisPiece, InfoPanel } from "../components/utils/JeuxAboutComponents";
import { library } from "../data/blocks";
import BtnContact from "../components/utils/BtnContact";
import BtnGhost from "../components/utils/BtnGhost";

const JeuxAbout = () => {
  const [placed, setPlaced] = useState<any[]>([]);
  const quote = "Le conte seul apporte l'ennui, le conte fait passer le précepte avec lui.";

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const blockData = e.dataTransfer.getData("block");
    if (!blockData) return;
    const block = JSON.parse(blockData);
    if (!placed.find((b) => b.id === block.id)) setPlaced([...placed, block]);
  };

  const handleDragStart = (e: React.DragEvent, b: any) => {
    e.dataTransfer.setData("block", JSON.stringify(b));
  };

  return (
    <section className="tetris-master-section">
      <div className="bg-decorations">
        <div className="grid-background"></div>
        <div className="floating-cube"></div>
      </div>

      <h1>MON MODE HISTOIRE</h1>

      <div className="container">
        <div className="hero-grid-layout">
          {/* Inventaire */}
          <aside className="inventory-panel">
            <div className="panel-header">COMPÉTENCES</div>
            <div className="pieces-grid">
              {library.map((b) => (
                <TetrisPiece
                  key={b.id}
                  block={b}
                  isLocked={placed.some((p) => p.id === b.id)}
                  onDragStart={handleDragStart}
                />
              ))}
            </div>
            <button className="reboot-btn" onClick={() => setPlaced([])}>
              NOUVELLE PARTIE
            </button>
          </aside>

          {/* Zone de construction */}
          <main className="construction-zone">
            <div className="terminal-top">
              <span className="path">ALEXANDRE-PHILIPPE_PEREZ/A_PROPOS</span>
            </div>
            <div
              className="main-board"
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
            >
              <div className="stack-area">
                {placed.map((b) => (
                  <TetrisPiece
                    key={b.id}
                    block={b}
                    onClick={(id: any) => setPlaced(placed.filter((p) => p.id !== id))}
                    className="placed-piece"
                  />
                ))}
              </div>
            </div>
            <div className="description-dynamic">
              <h3>CONSOLE.LOG ()</h3>
              <div className="log-scroll">
                {placed.length ? (
                  placed.map((b) => (
                    <p key={b.id} className="log-line">
                      <span>[OK]</span> {b.text}
                    </p>
                  ))
                ) : (
                  <p className="empty">En attente de données...</p>
                )}
              </div>
            </div>
          </main>

          {/* Info et actions */}
          <div className="right-col">
            <div className="content-panel">
               <InfoPanel quote={quote} />
               <div className="final-actions">
                  <BtnGhost to="/projets">SELECT PROJECTS</BtnGhost>
                  <BtnContact to="/contact">SELECT CONTACT</BtnContact>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JeuxAbout;