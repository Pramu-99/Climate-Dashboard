import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DailyMaxTempCard = ({ day, maxTemp }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    maxWidth: '18rem',
    backgroundColor: isHovered ? '#357ABD' : '#4a90e2',
    color: 'white',
    transition: 'background-color 0.3s ease',
  };

  return (
    <div
      className="card text-white mb-3"
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-header">{day}</div>
      <div className="card-body">
        <h5 className="card-title" style={{ fontSize: '1.5em' }}>{maxTemp}°C</h5>
        <p className="card-text" style={{ fontSize: '1em' }}>Maximum Temperature</p>
      </div>
    </div>
  );
}

export default DailyMaxTempCard;
