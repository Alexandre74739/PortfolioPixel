import { Link } from "react-router-dom";
import "./BtnOrange.scss";

function BtnOrange () {
  return (
    <Link to="/contact" className="btn-orange">
      CONTACT
    </Link>
  );
}

export default BtnOrange;