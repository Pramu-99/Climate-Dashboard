//server file

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PORT } from './config.js';

const app = express();
app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:3000' }));

let data = { temperature: 0, humidity: 0 };

app.post('/data', (req, res) => {
    data = req.body;
    console.log(data);
    res.send('Data received');
});

app.get('/data', (req, res) => {
    res.json(data);
});

app.get('/status', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
