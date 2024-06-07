import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Card from './components/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [data, setData] = useState({ temperature: 0, humidity: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the server
        const result = await axios.get('http://192.168.1.7:5000/data');
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 2000);

    //interval code
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <Card title="Temperature" value={Math.round(data.temperature)} unit="°C" />
          </div>
          <div className="col-md-6">
            <Card title="Humidity" value={data.humidity} unit="%" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
