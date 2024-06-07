// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Card from './components/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [data, setData] = useState({ temperature: 0, humidity: 0 });

  useEffect(() => {
    const fetchData = async () => {
      // Fetch data from my server
      const result = await axios.get('http://192.168.1.7:5000/data');
      setData(result.data);
    };

    fetchData(); // Call fetchData immediately
    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval); // Cleanup function to clear interval
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
