const express = require('express');
const api = require('../../api.js')
const path = require('path');

const Search = require('../models/Data')
const router = express.Router();

const publicFolder = path.join(__dirname, '..', '..', '..', '..', 'frontend', 'build');
router.use(express.static(publicFolder));

router.get('/jobs-search', async (req, res) => {
    let { city, pages, category} = req.query;
    city = city.toLowerCase();
    category = category.toLowerCase();
    const jobOffer = await Search.findOne({name: `${city}-${category}`});
    if (jobOffer) {
        const timeMinutes = new Date(Date.now() - jobOffer.date).getMinutes();
        if ( timeMinutes < 30){
            res.status(200).send(jobOffer.data);
        } else {
            const response = await api.getAllOffers(city, category, pages);
            await Search.findOneAndUpdate({name: `${city}-${category}`}, {data: response, date: Date.now()})
            res.status(200).send(response);
        };
    } else {
        const response = await api.getAllOffers(city, category, pages);
        const search = new Search({name: `${city}-${category}`, data: response})
        await search.save()
        res.status(200).send(response);
    };
});

router.get('/all', async (req,res) => {
    Search.find({}).then(docs => {res.json(docs);})
});

router.get('*', (req, res) => {
    res.sendFile(path.join(publicFolder, 'index.html'));
});


module.exports = router;