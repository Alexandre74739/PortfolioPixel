import React, { useState } from "react";
import { motion, type PanInfo } from "framer-motion";
import "./JeuxAbout.scss";
import {
  TetrisPiece,
  InfoPanel,
} from "../components/utils/JeuxAboutComponents";
import { library, type Block } from "../data/blocks";
import BtnContact from "../components/utils/BtnContact";
import BtnGhost from "../components/utils/BtnGhost";
import BackgroundParticles from "../components/utils/BackgroundParticles";
import { Reveal } from "../components/layout/Reveal";

const JeuxAbout: React.FC = () => {
  const [placed, setPlaced] = useState<Block[]>([]);
  const quote =
    "Le conte seul apporte l'ennui, le conte fait passer le précepte avec lui.";

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const blockData = e.dataTransfer.getData("block");
    if (!blockData) return;
    const block: Block = JSON.parse(blockData);
    if (!placed.find((b) => b.id === block.id)) setPlaced([...placed, block]);
  };

  const handleDragStart = (e: React.DragEvent, b: Block) => {
    e.dataTransfer.setData("block", JSON.stringify(b));
  };

  const handleDragEnd = (info: PanInfo, block: Block) => {
    const target = document.elementFromPoint(info.point.x, info.point.y);

    const isInsideLayout = target?.closest(".hero-grid-layout");
    const isOverInventory = target?.closest(".inventory-panel");

    if (isInsideLayout && !isOverInventory) {
      if (!placed.find((b) => b.id === block.id)) {
        setPlaced([...placed, block]);
      }
    }
  };

  return (
    <Reveal>
      <section className="tetris-master-section">
        <BackgroundParticles />
        <div className="bg-decorations">
          <div className="grid-background"></div>
          <div className="floating-cube"></div>
        </div>

        <h1>MON MODE HISTOIRE</h1>

        <div className="container">
          <div className="hero-grid-layout">
            <aside className="inventory-panel">
              <div className="panel-header">COMPÉTENCES</div>
              <div className="pieces-grid">
                {library.map((b: Block) => (
                  <motion.div
                    key={b.id}
                    drag
                    dragSnapToOrigin
                    whileDrag={{ zIndex: 1000 }}
                    onDragEnd={(_, info) => handleDragEnd(info, b)}
                    style={{ touchAction: "none" }}
                  >
                    <TetrisPiece
                      block={b}
                      isLocked={placed.some((p) => p.id === b.id)}
                      onDragStart={(e: React.DragEvent) =>
                        handleDragStart(e, b)
                      }
                    />
                  </motion.div>
                ))}
              </div>
              <button className="reboot-btn" onClick={() => setPlaced([])}>
                NOUVELLE PARTIE
              </button>
            </aside>

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
                  {placed.map((b: Block) => (
                    <TetrisPiece
                      key={b.id}
                      block={b}
                      onClick={(id: string | number) =>
                        setPlaced(placed.filter((p) => p.id !== id))
                      }
                      className="placed-piece"
                    />
                  ))}
                </div>
              </div>
              <div className="description-dynamic">
                <h3>CONSOLE.LOG ()</h3>
                <div className="log-scroll">
                  {placed.length ? (
                    placed.map((b: Block) => (
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
    </Reveal>
  );
};

export default JeuxAbout;