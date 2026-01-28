import { useState } from "react";
import "./MysteryBlock.scss";

interface MysteryBlockProps {
  content: string;
}

const MysteryBlock = ({ content }: MysteryBlockProps) => {
  const [isHit, setIsHit] = useState(false);
  const [showCoin, setShowCoin] = useState(false);

  const handleHit = () => {
    // Si le bloc est déjà en train de sauter ou "utilisé", on ne fait rien
    if (isHit) return;

    setIsHit(true);
    setShowCoin(true);

    setTimeout(() => {
      setShowCoin(false);
    }, 600);

    setTimeout(() => {
      setIsHit(false);
    }, 3000);
  };

  return (
    <div className="mystery-wrapper">
      <div
        className={`mystery-block ${isHit ? "is-hit" : ""}`}
        onClick={handleHit}
      >
        {showCoin && <div className="mario-coin">⭐</div>}
        <div className="block-face">
          <span className="q-mark">{content}</span>
        </div>
      </div>
    </div>
  );
};

export default MysteryBlock;