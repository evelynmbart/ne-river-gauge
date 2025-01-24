import { faStar, faWater } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <FontAwesomeIcon icon={faWater} /> RiverFlow NE
      </Link>
      <Link to="/starred" className="nav-starred">
        <FontAwesomeIcon icon={faStar} /> Starred Rivers
      </Link>
    </nav>
  );
}

export default Navbar;
