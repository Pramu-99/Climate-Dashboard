// src/components/Card.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Card = ({ title, value, unit, children }) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title text-center">{title}</h5> {/* Center-align title */}
                <div className="text-center mb-2"> {/* Center-align value and unit */}
                    <span style={{ fontSize: "4em"}}>{value}</span>&nbsp;
                    <span style={{ fontSize: "1.5em" }}>{unit}</span>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Card;
