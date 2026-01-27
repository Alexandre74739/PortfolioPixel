export const TetrisPiece = ({
  block,
  isLocked,
  onDragStart,
  onClick,
  className,
}: any) => (
  <div
    draggable={!isLocked}
    onDragStart={(e) => onDragStart?.(e, block)}
    onClick={() => onClick?.(block.id)}
    className={`tetris-piece ${block.shape} ${block.color} ${isLocked ? "locked" : ""} ${className || ""}`}
  >
    <span>{block.label}</span>
  </div>
);

export const InfoPanel = ({ quote }: { quote: string }) => (
  <aside className="content-panel">
    <div className="manifesto">
      <h2>POURQUOI LE PIXEL ?</h2>
      <p>
        Le<strong>pixel</strong> c'est le début, une base solide qui, comme moi, peux porter des mondes bien plus vastes.
      </p>
    </div>
    <div className="quote-box">
      <blockquote className="glitch-quote">
        "{quote}"<br />
        <cite>— La Fontaine</cite>
      </blockquote>
      <p className="explanation">
        Animateur dans l'âme, j'ai appris que l'on n'apprend jamais mieux qu'en
        jouant. Mes interfaces sont donc des expériences où le plaisir sert
        l'efficacité.
      </p>
    </div>
  </aside>
);
