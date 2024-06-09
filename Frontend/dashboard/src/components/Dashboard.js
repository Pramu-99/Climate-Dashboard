// src/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar'
import Card from '../components/Card';
import GoogleMapComponent from '../components/GoogleMapComponent';

const Dashboard = () => {
    const [data, setData] = useState({ temperature: 0, humidity: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://192.168.1.7:5000/data');
                setData(result.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <div className="row align-items-start"> {/* Updated alignment */}
                    <div className="col-md-4">
                        <Card title="Temperature" value={Math.round(data.temperature)} unit="°C" />
                    </div>
                    <div className="col-md-4">
                        <Card title="Humidity" value={data.humidity} unit="%" />
                    </div>
                    <div className="col-md-4">
                        <Card title="Location">
                            <GoogleMapComponent />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
