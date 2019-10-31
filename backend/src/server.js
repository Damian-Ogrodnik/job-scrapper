const cors = require('cors');
const express = require('express');
const path = require('path');
const api = require('./api.js')

const app = express();

const publicFolder = path.join(__dirname, '..', '..', 'frontend', 'build');

app.use(cors());
app.use(express.static(publicFolder));

app.get('/jobs-search', async (req, res) => {
    const { city, pages, category} = req.query;
    const response = await api.getAllOffers(city, category, pages);
    res.status(200).send(response);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(publicFolder,'index.html'));
});

app.listen(7000, () => {
    console.log('Server is listening...');
});
