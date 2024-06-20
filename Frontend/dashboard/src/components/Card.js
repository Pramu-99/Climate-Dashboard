// src/components/Card.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Card = ({ title, value, unit, children, icon, height, width }) => {
    const [isHovered, setIsHovered] = useState(false);

    const cardStyle = {
        height: height || '400px',
        width: width || '100%',
        backgroundColor: '#394d6e',
        color: 'white',
        border: isHovered ? '2px solid white' : '2px solid transparent',
        transition: 'border-color 0.3s ease'
    };

    return (
        <div
            className="card"
            style={cardStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="card-body d-flex flex-column">
                <h5 className="card-title text-center">{title}</h5>
                {value !== undefined && unit !== undefined ? (
                    <div className="text-center mb-2 d-flex align-items-center justify-content-center">
                        {icon && <span style={{ fontSize: "3em", marginRight: "0.2em" }}>{icon}</span>}
                        <div>
                            <span style={{ fontSize: "4.5em" }}>{value}</span>&nbsp;
                            <span style={{ fontSize: "1.5em" }}>{unit}</span>
                        </div>
                    </div>
                ) : null}
                <div className="flex-grow-1">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Card;
