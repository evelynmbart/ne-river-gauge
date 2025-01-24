import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowLeft,
  faStar as faStarSolid,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { rivers } from "../data/rivers";
import { fetchRiverData } from "../utils/usgsApi";
import "./RiverDetail.css";

function RiverDetail({ starredRivers, onToggleStar }) {
  const { id } = useParams();
  const [riverData, setRiverData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const river = rivers.find((r) => r.id === id);

  useEffect(() => {
    async function loadRiverData() {
      if (!river) return;

      try {
        setLoading(true);
        const data = await fetchRiverData(river.gaugeId);
        if (data) {
          setRiverData(data);
          setError(null);
        } else {
          setError("Unable to fetch river data");
        }
      } catch (err) {
        setError("Error loading river data");
      } finally {
        setLoading(false);
      }
    }

    loadRiverData();
    const interval = setInterval(loadRiverData, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, [river]);

  if (!river) {
    return (
      <div className="river-detail error">
        <h2>River not found</h2>
        <Link to="/" className="back-link">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Rivers
        </Link>
      </div>
    );
  }

  return (
    <div className="river-detail">
      <div className="river-header">
        <Link to="/" className="back-link">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Rivers
        </Link>
      </div>

      <div className="river-content">
        <div className="title-container">
          <h1>{river.name}</h1>
          <button className="star-btn" onClick={() => onToggleStar(river.id)}>
            <FontAwesomeIcon
              size="lg"
              icon={
                starredRivers.includes(river.id) ? faStarSolid : faStarRegular
              }
              className={starredRivers.includes(river.id) ? "starred" : ""}
            />
          </button>
        </div>

        <div className="flow-data">
          <h2>Current Flow Data</h2>
          {loading ? (
            <p>Loading flow data...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <div className="flow-details">
              <div className="flow-value">
                <span className="number">{riverData.flow.toFixed(1)}</span>
                <span className="unit">CFS</span>
              </div>
              <p className="timestamp">
                Last updated: {riverData.timestamp.toLocaleString()}
              </p>
            </div>
          )}
        </div>

        <div className="river-info">
          <p className="location">Location: {river.location}</p>
          <p className="fun-fact">
            The {river.name} is {river.funFact}.
          </p>
        </div>

        {river.imageUrl && (
          <div className="river-image">
            <img src={river.imageUrl} alt={river.name} />
          </div>
        )}
      </div>
    </div>
  );
}

export default RiverDetail;
