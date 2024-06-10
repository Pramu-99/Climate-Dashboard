// src/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import GoogleMapComponent from '../components/GoogleMapComponent';
import { WiThermometer, WiHumidity } from 'react-icons/wi'; // Importing weather icons

const Dashboard = () => {
    const [data, setData] = useState({ temperature: 0, humidity: 0 });
    const [maxTemps, setMaxTemps] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://192.168.1.7:5000/data');
                setData(result.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchMaxTemps = async () => {
            try {
                const result = await axios.get('http://192.168.1.7:5000/max-temps');
                setMaxTemps(result.data);
            } catch (error) {
                console.error('Error fetching max temps:', error);
            }
        };

        fetchData();
        fetchMaxTemps();
        const interval = setInterval(fetchData, 2000);
        return () => clearInterval(interval);
    }, []);

    const cardHeight = '200px'; // Set the desired height

    return (
        <div style={{ backgroundColor: '#171559', minHeight: '100vh', paddingTop: '20px' }}>
            <Navbar />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <Card 
                            title="Temperature" 
                            value={Math.round(data.temperature)} 
                            unit="°C" 
                            height={cardHeight}
                            icon={<WiThermometer style={{ color: 'white' }} />} // Pass the thermometer icon
                        />
                    </div>
                    <div className="col-md-4 mb-4">
                        <Card 
                            title="Humidity" 
                            value={data.humidity} 
                            unit="%" 
                            height={cardHeight}
                            icon={<WiHumidity style={{ color: 'white' }} />} // Pass the humidity icon
                        />
                    </div>
                    <div className="col-md-4 mb-4">
                        <Card title="Location" height={cardHeight}>
                            <div style={{ height: '100%' }}>
                                <GoogleMapComponent />
                            </div>
                        </Card>
                    </div>
                </div>
                <div className="row">
                    {maxTemps.map((temp, index) => (
                        <div key={index} className="col-md-1 mb-4">
                            <Card 
                                title={`Day ${index + 1}`}
                                value={Math.round(temp.temperature)}
                                unit="°C"
                                height="100px"
                                width="100px"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
