import { Link } from "react-router-dom";
import "./BtnGhost.scss";

interface BtnGhostProps {
  children: React.ReactNode;
  to: string;
  isActive?: boolean;
  onClick?: () => void;
}

const BtnGhost: React.FC<BtnGhostProps> = ({
  children,
  to,
  isActive,
  onClick,
}) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`btn-ghost-arcade ${isActive ? "active" : ""}`}
    >
      <span className="btn-text">{children}</span>
    </Link>
  );
};

export default BtnGhost;
