import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PORT } from './config.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());

let data = { temperature: 0, humidity: 0 };

app.post('/data', (req, res) => {
    data = req.body;
    console.log(data);
    res.send('Data received');
});

app.get('/data', (req, res) => {
    res.json(data);
});

//const port = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
