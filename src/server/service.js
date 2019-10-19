const url = require('url');
const Scrapper = require('../Scrapper.js')

exports.jobsRequest = async (req, res) => {
    try{
        const reqUrl = url.parse(req.url, true);
        let city
        if (reqUrl.query.city) {
            city = reqUrl.query.city
        }
        const scrapper = new Scrapper(city, 10);
        await scrapper.init();
        const response = await scrapper.getOffers();

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    }
    catch (error) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Oops, something went wrong :c');
      }
};