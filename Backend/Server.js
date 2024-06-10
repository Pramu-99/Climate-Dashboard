// src/server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { PORT, mongoURL } from './config.js';
import MaxTemperature from './Model/TempModel.js';

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Add CORS middleware

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
        console.log('Max temperature updated');
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
    console.log(`Server is running on port ${PORT}`);
});
