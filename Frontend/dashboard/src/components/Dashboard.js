// src/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import GoogleMapComponent from '../components/GoogleMapComponent';
import DailyMaxTempCard from '../components/DailyMaxTempCard';
import { WiThermometer, WiHumidity } from 'react-icons/wi';

const Dashboard = () => {
    const [data, setData] = useState({ temperature: 0, humidity: 0 });
    const [maxTemps, setMaxTemps] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:5000/data');
                setData(result.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchMaxTemps = async () => {
            try {
                const result = await axios.get('http://localhost:5000/max-temps');
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

    const cardHeight = '200px';

    // Function to get the day name
    const getDayName = (index) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[index];
    };

    // Get today's day index
    const todayIndex = new Date().getDay();

    return (
        <div style={{ backgroundColor: '#171559', minHeight: '100vh', paddingTop: '20px' }}>
            <Navbar />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-4 col-sm-6 mb-4">
                        <Card
                            title="Temperature"
                            value={Math.round(data.temperature)}
                            unit="°C"
                            height={cardHeight}
                            icon={<WiThermometer />}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 mb-4">
                        <Card
                            title="Humidity"
                            value={data.humidity}
                            unit="%"
                            height={cardHeight}
                            icon={<WiHumidity />}
                        />
                    </div>
                    <div className="col-md-4 col-sm-12 mb-4">
                        <Card title="Location" height={cardHeight}>
                            <div style={{ height: '100%' }}>
                                <GoogleMapComponent />
                            </div>
                        </Card>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h4 className="text-white">Weekly Maximum Temperatures</h4>
                    </div>
                    {[...Array(7)].map((_, index) => {
                        const dayIndex = (todayIndex - 6 + index + 7) % 7;
                        const dayName = getDayName(dayIndex);
                        const tempData = maxTemps.find((temp) => new Date(temp.date).getDay() === dayIndex);
                        const temperature = tempData ? tempData.temperature : 'N/A';

                        return (
                            <div key={index} className="col-md-4 col-sm-6 mb-4 mt-4">
                                <DailyMaxTempCard
                                    day={dayName}
                                    maxTemp={temperature}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
