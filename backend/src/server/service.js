const url = require('url');
const api = require('../api.js')

exports.jobsRequest = async (req, res) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', "*");
        const reqUrl = url.parse(req.url, true);
        const {city, category, pages} = reqUrl.query;
        let response = await api.getAllOffers(city,category, pages);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(response);
    }
    catch (error) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Something went wrong...');
      };
};