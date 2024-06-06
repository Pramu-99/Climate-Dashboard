// components/Card.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Card = ({ title, value, unit }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{value} {unit}</p>
      </div>
    </div>
  );
}

export default Card;
