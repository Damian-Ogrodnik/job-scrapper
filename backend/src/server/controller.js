const http = require('http');
const url = require('url');
const service = require('./service.js');

module.exports = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);

    // GET Endpoint
    if (req.method === 'GET') {
        console.log('Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);

        service.jobsRequest(req, res);
    };
});