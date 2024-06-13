Weather Dashboard
Table of Contents
Project Overview
Features
Technologies Used
Getting Started
Prerequisites
Installation
Running the Application
Backend
API Endpoints
Frontend
Components
Deployment
Firebase Hosting
MongoDB Atlas
Contributing
License
Project Overview
Weather Dashboard is a web application that displays real-time temperature and humidity data, along with the maximum temperatures recorded over the past week. The application consists of a backend server that provides the data and a frontend client that displays it.

Features
Real-time temperature and humidity updates
Weekly maximum temperature display
Google Maps integration for location display
Responsive design using Bootstrap
Technologies Used
Frontend: React, Bootstrap, Axios
Backend: Node.js, Express, Mongoose
Database: MongoDB Atlas
Hosting: Firebase Hosting
Getting Started
Prerequisites
Node.js and npm installed
MongoDB Atlas account
Firebase CLI installed
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/Pramu-99/Climate-Dashboard.git
cd weather-dashboard
Install backend dependencies:

bash
Copy code
cd backend
npm install
Install frontend dependencies:

bash
Copy code
cd ../frontend
npm install
Running the Application
Start the backend server:

bash
Copy code
cd backend
npm start
Start the frontend development server:

bash
Copy code
cd ../frontend
npm start
Backend
API Endpoints
POST /data: Receive and store temperature and humidity data.
GET /data: Retrieve the latest temperature and humidity data.
GET /max-temps: Retrieve the maximum temperatures for the past 7 days.
GET /status: Check the server status.
Example Server Code (src/server.js)
js
Copy code
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { PORT, mongoURL } from './config.js';
import MaxTemperature from './Model/TempModel.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('Successfully connected to the database');
});

mongoose.connection.on('error', (err) => {
    console.error(`Database connection error: ${err}`);
});

let data = { temperature: 0, humidity: 0 };

app.post('/data', async (req, res) => {
    data = req.body;
    console.log(data);

    const today = new Date().setHours(0, 0, 0, 0);

    try {
        await MaxTemperature.findOneAndUpdate(
            { date: today },
            { temperature: data.temperature },
            { upsert: true, new: true }
        );
        console.log('Max temperature updated
');
res.send('Data received');
} catch (err) {
res.status(500).send(err);
}
});

app.get('/data', (req, res) => {
res.json(data);
});

app.get('/max-temps', async (req, res) => {
try {
const maxTemps = await MaxTemperature.find().sort({ date: -1 }).limit(7);
res.json(maxTemps);
} catch (error) {
res.status(500).send(error);
}
});

// Add status endpoint
app.get('/status', (req, res) => {
res.send('ok');
});

app.listen(PORT, () => {
console.log(Server is running on port ${PORT});
});

bash
Copy code

## Frontend

### Components

- **Navbar**: Displays the navigation bar with server status.
- **Card**: A reusable card component for displaying data.
- **DailyMaxTempCard**: A card specifically for displaying daily maximum temperatures.
- **GoogleMapComponent**: Integrates Google Maps for location display.

### Example Component (src/components/DailyMaxTempCard.js)

```js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DailyMaxTempCard = ({ day, maxTemp }) => {
  return (
    <div className="card text-white bg-primary mb-3" style={{ maxWidth: '18rem' }}>
      <div className="card-header">{day}</div>
      <div className="card-body">
        <h5 className="card-title" style={{ fontSize: '1.5em' }}>{maxTemp}°C</h5>
        <p className="card-text" style={{ fontSize: '1em' }}>Maximum Temperature</p>
      </div>
    </div>
  );
}

export default DailyMaxTempCard;
Main Dashboard (src/Dashboard.js)
js
Copy code
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
    const [maxTemps, setMaxTemps] = useState(Array(7).fill('N/A'));

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
                const temps = result.data.map(entry => entry.temperature);
                setMaxTemps(prev => temps.concat(prev.slice(temps.length)));
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
                            icon={<WiThermometer style={{ color: 'white' }} />}
                        />
                    </div>
                    <div className="col-md-4 mb-4">
                        <Card 
                            title="Humidity" 
                            value={data.humidity} 
                            unit="%" 
                            height={cardHeight}
                            icon={<WiHumidity style={{ color: 'white' }} />}
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
                    <div className="col-12 mb-3">
                        <h3 className="text-white">Weekly Maximum Temperature</h3>
                    </div>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
                        <div key={index} className="col-md-3 mb-4">
                            <DailyMaxTempCard 
                                day={day}
                                maxTemp={maxTemps[index] !== 'N/A' ? `${maxTemps[index]}°C` : 'N/A'}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
Deployment
Firebase Hosting
Install Firebase CLI:

bash
Copy code
npm install -g firebase-tools
Login to Firebase:

bash
Copy code
firebase login
Initialize Firebase in your project:

bash
Copy code
firebase init
Select Hosting and your Firebase project.
Set build as the public directory.
Configure as a single-page app.
Deploy to Firebase:

bash
Copy code
npm run build
firebase deploy
MongoDB Atlas
Create a MongoDB Atlas account and set up a cluster.
Add your IP address to the whitelist.
Get your connection string and update your backend configuration:
js
Copy code
const mongoURL = 'your-mongodb-connection-string';
Contributing
Fork the repository
Create a new branch (git checkout -b feature-branch)
Make your changes
Commit your changes (git commit -am 'Add some feature')
Push to the branch (git push origin feature-branch)
Open a Pull Request
License
This project is licensed under the MIT License - see the LICENSE file for details.
