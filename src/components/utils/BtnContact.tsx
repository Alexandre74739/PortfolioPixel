import { Link } from "react-router-dom";
import "./BtnContact.scss";

interface BtnContactProps {
  children: React.ReactNode;
  to?: string;
  className?: string;
  onClick?: () => void;
}

const BtnContact: React.FC<BtnContactProps> = ({
  children,
  to = "/",
  className = "",
  onClick,
}) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`btn-orange-arcade ${className}`}
    >
      <span className="btn-inner">{children}</span>
    </Link>
  );
};

export default BtnContact;
