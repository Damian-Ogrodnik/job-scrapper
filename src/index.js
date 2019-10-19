const Scrapper = require('./Scrapper.js')

const scrapper = new Scrapper(10, 'ropczyce');

(async () => {
    await scrapper.init();
    await scrapper.getOffers();
    await scrapper.createJSON();
})();
