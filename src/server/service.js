const url = require('url');
const api = require('../api.js')

exports.jobsRequest = async (req, res) => {
    try{
        const reqUrl = url.parse(req.url, true);
        let city
        if (reqUrl.query.city) {
            city = reqUrl.query.city
        }

        const response = await api.getAllOffers('ropczyce', 10)

        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.end(response);
    }
    catch (error) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Something went wrong...');
      }
};