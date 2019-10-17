const puppeteer = require('puppeteer');
const fs = require('fs');

class Scrapper{
    constructor(pagesNum = 1, city){
        this.browser = null
        this.page = null
        this.offers = []
        this.pagesNum = pagesNum
        this.city = city
        this.websiteUrl = `https://www.pracuj.pl/praca/${city}`
    }

   async init(){
        this.browser = await puppeteer.launch({
            headless: true
        });
        this.page = await this.browser.newPage();
        await this.page.goto(this.websiteUrl, {waitUntil: 'domcontentloaded'});
    };

    async getOffers(){
        for (let i = 1; i <= this.pagesNum; i++) {
            console.log(`Searching page: ${i}...`);
            const offersHandler = await this.page.$$('#results > ul > .results__list-container-item');
            const offersData = offersHandler.map(async offer => {
                const offerDetails = await offer.$$('div  > .offer__info > .offer-details');
                const jobName = await offerDetails[0].$eval('h3', el => el.innerText);
                const company = await offerDetails[0].$eval('p', el => el.innerText);
                const linkData = await offerDetails[0].$eval('.offer-details__title-link', el => el.getAttribute('href'));
                const link = `https://www.pracuj.pl/${linkData}`
                return {
                    jobName,
                    company,
                    link
                }
            });
            await Promise.all(offersData).then(result => {
                result.map((offer) => {
                    this.offers.push(offer)
                })
            });
            await Promise.all([
                this.page.waitForNavigation({
                    waitUntil: 'domcontentloaded'
                }),
                this.page.goto(`https://www.pracuj.pl/praca/${this.city}?pn=${i}`)
            ]);
        };
        return this.offers;
    };

    async createJSON(){
        let JSONoffers = JSON.stringify(this.offers)
        fs.writeFile(`offers-${this.city}.json`, JSONoffers, 'utf8', (err) => {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been saved.");
        });
        console.log(`Total offers founded: ${this.offers.length}`);
        await this.browser.close();
    };
}

module.exports = Scrapper;

// getOffers = async (pagesNum = 1, city) => {
//     const offers = [];
//     const websiteUrl = `https://www.pracuj.pl/praca/${city}`;
//     const browser = await puppeteer.launch({
//         headless: true
//     });
//     const page = await browser.newPage();
//     await page.goto(websiteUrl, {waitUntil: 'domcontentloaded'});
//     for (let i = 1; i <= pagesNum; i++){
//         console.log(`Searching page: ${i}...`);
//         const offersHandler = await page.$$('#results > ul > .results__list-container-item');
//         const offersData = offersHandler.map( async offer =>{
//             const offerDetails = await offer.$$('div  > .offer__info > .offer-details');
//             const jobName = await offerDetails[0].$eval('h3', el => el.innerText);
//             const company = await offerDetails[0].$eval('p', el => el.innerText);
//             const linkData = await offerDetails[0].$eval('.offer-details__title-link', el => el.getAttribute('href'));
//             const link = `https://www.pracuj.pl/${linkData}`
//             return  {
//                 jobName,
//                 company,
//                 link
//             }});
//         await Promise.all(offersData).then(result => {
//             result.map((offer) => {
//                 offers.push(offer)
//             })});
//         await Promise.all([
//             page.waitForNavigation({
//                 waitUntil: 'domcontentloaded'
//             }),
//             page.goto(`https://www.pracuj.pl/praca/${city}?pn=${i}`)]);
//     };
//     let JSONoffers = JSON.stringify(offers)
//     fs.writeFile(`offers-${city}.json`, JSONoffers, 'utf8', (err) => {
//         if (err) {
//             console.log("An error occured while writing JSON Object to File.");
//             return console.log(err);
//         }
//         console.log("JSON file has been saved.");
//     });
//     console.log(`Total offers founded: ${offers.length}`);
//     await browser.close();
// };
