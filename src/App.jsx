import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import RiverDetail from "./components/RiverDetail";
import RiverList from "./components/RiverList";
import StarredRivers from "./components/StarredRivers";

function App() {
  const [starredRivers, setStarredRivers] = useState([]);

  useEffect(() => {
    // Load starred rivers from localStorage
    const stored = localStorage.getItem("starredRivers");
    if (stored) {
      setStarredRivers(JSON.parse(stored));
    }
  }, []);

  const toggleStar = (riverId) => {
    const newStarred = starredRivers.includes(riverId)
      ? starredRivers.filter((id) => id !== riverId)
      : [...starredRivers, riverId];

    setStarredRivers(newStarred);
    localStorage.setItem("starredRivers", JSON.stringify(newStarred));
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <RiverList
                  starredRivers={starredRivers}
                  onToggleStar={toggleStar}
                />
              }
            />
            <Route
              path="/river/:id"
              element={
                <RiverDetail
                  starredRivers={starredRivers}
                  onToggleStar={toggleStar}
                />
              }
            />
            <Route
              path="/starred"
              element={
                <StarredRivers
                  starredRivers={starredRivers}
                  onToggleStar={toggleStar}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
