const puppeteer = require('puppeteer');
const fs = require('fs');
const chalk = require('chalk');

class Scrapper{
    constructor(city = undefined, pagesNum = Infinity) {
        this.browser = null
        this.page = null
        this.offers = []
        this.pagesNum = pagesNum
        this.city = city
        this.websiteUrl = city === undefined ? 'https://www.pracuj.pl/praca/' : `https://www.pracuj.pl/praca/${city}` 
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
                const offerDetails = await offer.$$('div  > .offer__info');
                const jobName = await offerDetails[0].$eval('h3', el => el.innerText);
                const company = await offerDetails[0].$eval('p', el => el.innerText);
                const linkData = await offerDetails[0].$eval('.offer-details__title-link', el => el.getAttribute('href'));
                const link = `https://www.pracuj.pl/${linkData}`;
                const description = await offerDetails[0].$eval('.offer-labels:last-of-type', el => el.innerText);
                const city = await offerDetails[0].$eval('.offer-labels__item', el => el.innerText)
                return {
                    jobName,
                    company,
                    link,
                    description,
                    city
                }
            });
            await Promise.all(offersData).then(result => {
                result.map((offer) => {
                    this.offers.push(offer)
                })
            });
            try{
                await Promise.all([
                    this.page.waitForNavigation({
                        waitUntil: 'domcontentloaded'
                    }),
                    this.page.click('li.pagination_element--next > a')
                ]);
            }
            catch {
                console.log(chalk.red('No more pages...'));
                break
            }
        };
        let JSONoffers = JSON.stringify(this.offers);
        await this.browser.close();
        console.log(`Total offers founded: ${chalk.green(this.offers.length)}`);
        return JSONoffers;
    };

    async createJSON(){
        let JSONoffers = JSON.stringify(this.offers)
        fs.writeFile(`offers-${this.city}.json`, JSONoffers, 'utf8', (err) => {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log(chalk.green("JSON file has been saved."));
        });
    };
}

module.exports = Scrapper;