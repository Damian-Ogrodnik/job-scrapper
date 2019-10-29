const Scrapper = require('./Scrapper.js')

const getOffers = async (websiteURL, website, city, numberOfPages, offersHandlerSelector, offerDetailsSelector, jobNameSelector, linkSelector, companySelector, citySelector, descriptionSelector, nextPageSelector) => {
    const scrapper = new Scrapper(websiteURL, website, city, numberOfPages, offersHandlerSelector, offerDetailsSelector, jobNameSelector, linkSelector, companySelector, citySelector, descriptionSelector, nextPageSelector);
    await scrapper.init();
    const data = await scrapper.getOffers();
    return data
};

module.exports.getAllOffers = async (city, category, numberOfPages) => {
    let OLXlink, pracujLink;
    switch (true){
        case (city && category !== 'undefined'):
            OLXlink = `https://www.olx.pl/praca/${city}/q-${category}/`
            pracujLink = `https://www.pracuj.pl/praca/${category}/${city}`
            break;
        case (category !== 'undefined'):
            OLXlink = `https://www.olx.pl/praca/q-${category}/`
            pracujLink = `https://www.pracuj.pl/praca/${category}`
            break;
        case (city):
            OLXlink = `https://www.olx.pl/praca/${city}`
            pracujLink = `https://www.pracuj.pl/praca/${city}`
            break;
        default:
            OLXlink = 'https://www.olx.pl/praca'
            pracujLink = `https://www.pracuj.pl/praca/`
    };
    const OLX = await getOffers(OLXlink, 'OLX', city, numberOfPages, 'table#offers_table > tbody > .wrap', '.offer-wrapper', 'h3', 'h3 > a', null, 'div > p > small > span', 'tr > td > div > p', '.next > a');
    const pracujPL = await getOffers(pracujLink, 'pracuj.pl', city, numberOfPages, '#results > ul > .results__list-container-item', 'div  > .offer__info', 'h3', '.offer-details__title-link', 'p', '.offer-labels__item', '.offer-labels:last-of-type', 'li.pagination_element--next > a');
    const data = await [...OLX, ...pracujPL];
    return data
};