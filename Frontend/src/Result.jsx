import React from "react";

function Result({ source, destination, stations }) {
  return (
    <div className="result-container">
      <p className="result-item">
        <span className="result-label">Source:</span> {source}
      </p>
      <p className="result-item">
        <span className="result-label">Destination:</span> {destination}
      </p>
      <p className="result-item">
        <span className="result-label">Number of Stations:</span>{" "}
        {stations.length}
      </p>
      <p className="result-item">
        <span className="result-label">Stations:</span> {stations.join(", ")}
      </p>
    </div>
  );
}

export default Result;
