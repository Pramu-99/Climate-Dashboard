import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [data, setData] = useState({ temperature: 0, humidity: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://192.168.1.7:3000/data'); 
      setData(result.data);
    };

    const intervalId = setInterval(fetchData, 2000); 
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>ESP32 DHT11 Sensor Data</h1>
      <p>Temperature: {data.temperature} °C</p>
      <p>Humidity: {data.humidity} %</p>
    </div>
  );
}

export default Dashboard;
