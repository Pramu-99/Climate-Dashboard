// src/components/DailyMaxTempCard.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DailyMaxTempCard = ({ day, maxTemp }) => {
  return (
    <div className="card text-white bg-primary mb-3" style={{ maxWidth: '18rem' }}>
      <div className="card-header">{day}</div>
      <div className="card-body">
        <h5 className="card-title">{maxTemp}°C</h5>
        <p className="card-text" style={{ fontSize: '1.2em' }}>Maximum Temperature</p>
      </div>
    </div>
  );
}

export default DailyMaxTempCard;
