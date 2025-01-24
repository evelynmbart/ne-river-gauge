import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowLeft,
  faStar as faStarSolid,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { rivers } from "../data/rivers";
import "./StarredRivers.css";

function StarredRivers({ starredRivers, onToggleStar }) {
  const starredRiversData = rivers.filter((river) =>
    starredRivers.includes(river.id)
  );

  return (
    <div className="starred-rivers">
      <div className="starred-header">
        <Link to="/" className="back-link">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Rivers
        </Link>
        <h1>Starred Rivers</h1>
      </div>

      {starredRiversData.length === 0 ? (
        <div className="no-stars">
          <FontAwesomeIcon icon={faStarRegular} className="star-icon" />
          <p>No rivers starred yet</p>
          <Link to="/" className="primary-link">
            Browse Rivers
          </Link>
        </div>
      ) : (
        <div className="rivers-grid">
          {starredRiversData.map((river) => (
            <div key={river.id} className="river-card">
              <button
                className="star-btn-2"
                onClick={() => onToggleStar(river.id)}
              >
                <FontAwesomeIcon icon={faStarSolid} className="starred" />
              </button>
              <Link to={`/river/${river.id}`} className="river-link">
                <h3>{river.name}</h3>
                <p className="river-location">{river.location}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StarredRivers;
