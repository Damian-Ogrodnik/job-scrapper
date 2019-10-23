const Scrapper = require('./Scrapper.js')

const getOffers = async (websiteURL, website, city, numberOfPages, offersHandlerSelector, offerDetailsSelector, jobNameSelector, linkSelector, companySelector, citySelector, descriptionSelector, nextPageSelector) => {
    const scrapper = new Scrapper(websiteURL, website, city, numberOfPages, offersHandlerSelector, offerDetailsSelector, jobNameSelector, linkSelector, companySelector, citySelector, descriptionSelector, nextPageSelector);
    await scrapper.init();
    const data = await scrapper.getOffers();
    return data
};

module.exports.getAllOffers = async (city, numberOfPages) => {
    const OLX = await getOffers('https://www.olx.pl/praca', 'OLX', city, numberOfPages, 'table#offers_table > tbody > .wrap', '.offer-wrapper', 'h3', 'h3 > a', null, 'div > p > small > span', 'tr > td > div > p', '.next > a')
    const pracujPL = await getOffers('https://www.pracuj.pl/praca', 'pracuj.pl', city, numberOfPages, '#results > ul > .results__list-container-item', 'div  > .offer__info', 'h3', '.offer-details__title-link', 'p', '.offer-labels__item', '.offer-labels:last-of-type', 'li.pagination_element--next > a')
    const data = await [...OLX, ...pracujPL]
    const response = await JSON.stringify(data)
    return response
};