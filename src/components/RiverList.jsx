import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import { rivers, states } from "../data/rivers";
import "./RiverList.css";

function RiverList({ starredRivers, onToggleStar }) {
  const [selectedState, setSelectedState] = useState("all");

  const filteredRivers =
    selectedState === "all"
      ? rivers
      : rivers.filter((river) => river.state === selectedState);

  return (
    <div className="river-list">
      <div className="state-filter">
        <button
          className={`state-btn ${selectedState === "all" ? "active" : ""}`}
          onClick={() => setSelectedState("all")}
        >
          All States
        </button>
        {states.map((state) => (
          <button
            key={state}
            className={`state-btn ${selectedState === state ? "active" : ""}`}
            onClick={() => setSelectedState(state)}
          >
            {state}
          </button>
        ))}
      </div>

      <div className="rivers-grid">
        {filteredRivers.map((river) => (
          <div key={river.id} className="river-card">
            <button
              className="star-btn"
              onClick={(e) => {
                e.preventDefault();
                onToggleStar(river.id);
              }}
            >
              <FontAwesomeIcon
                icon={
                  starredRivers.includes(river.id) ? faStarSolid : faStarRegular
                }
                className={starredRivers.includes(river.id) ? "starred" : ""}
              />
            </button>
            <Link to={`/river/${river.id}`} className="river-link">
              <h3>{river.name}</h3>
              <p className="river-location">{river.location}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RiverList;
