const cors = require('cors');
const express = require('express');
const path = require('path');
const api = require('./api.js')

const app = express();

app.use(cors());

app.get('/jobs-search', async (req, res) => {
    const { city, pages, category} = req.query
    const response = await api.getAllOffers(city, category, pages);
    res.status(200).send(response)
});

app.listen(7000, () => {
    console.log('Server is listening...');
});
