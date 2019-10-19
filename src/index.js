const Scrapper = require('./Scrapper.js')

const getOffers = async (city, numberOfPages) => {
    const scrapper = new Scrapper(city, numberOfPages);
    await scrapper.init();
    await scrapper.getOffers();
    await scrapper.createJSON();
}

exports.module = getOffers()