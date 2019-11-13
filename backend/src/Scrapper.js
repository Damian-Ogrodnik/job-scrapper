const puppeteer = require('puppeteer');
const fs = require('fs');
const chalk = require('chalk');

class Scrapper {
    constructor(websiteUrl, website, city = undefined, pagesNum = Infinity, offersHandlerSelector, offerDetailsSelector, jobNameSelector, linkSelector, companySelector, citySelector, descriptionSelector, nextPageSelector) {
        this.website = website
        this.browser = null
        this.page = null
        this.offers = []
        this.pagesNum = pagesNum
        this.city = city
        this.websiteUrl = websiteUrl
        this.offersHandlerSelector = offersHandlerSelector
        this.offerDetailsSelector = offerDetailsSelector
        this.jobNameSelector = jobNameSelector
        this.linkSelector = linkSelector
        this.companySelector = companySelector
        this.citySelector = citySelector
        this.descriptionSelector = descriptionSelector
        this.nextPageSelector = nextPageSelector
    };

    async init() {
        this.browser = await puppeteer.launch({
            headless: true
        });
        this.page = await this.browser.newPage();
        await this.page.goto(this.websiteUrl, {
            waitUntil: 'domcontentloaded'
        });
    };

    async getOffers() {
        for (let i = 1; i <= this.pagesNum; i++) {
            console.log(`Searching page: ${i}...`);
            const offersHandler = await this.page.$$(this.offersHandlerSelector);
            const offersData = offersHandler.map(async offer => {
                const offerDetails = await offer.$$(this.offerDetailsSelector);
                const jobName = await offerDetails[0].$eval(this.jobNameSelector, el => el.innerText);
                const city = await offerDetails[0].$eval(this.citySelector, el => el.innerText);
                const description = await offerDetails[0].$eval(this.descriptionSelector, el => el.innerText);
                let linkData, company
                if(this.website === 'pracuj.pl'){
                    const link = await offerDetails[0].$eval(this.linkSelector, el => el.getAttribute('href'));
                    linkData = `https://www.pracuj.pl/${link}`;
                } else {
                    linkData = await offerDetails[0].$eval(this.linkSelector, el => el.getAttribute('href'));
                }
                try{
                    company = await offerDetails[0].$eval(this.companySelector, el => el.innerText);
                }
                catch(err){
                    company = '';
                }
                return {
                    jobName,
                    company,
                    linkData,
                    description,
                    city
                }
            });
            await Promise.all(offersData).then(result => {
                result.map((offer) => {
                    this.offers.push(offer)
                })
            });
            try {
                await Promise.all([
                    this.page.waitForNavigation({
                        waitUntil: 'domcontentloaded'
                    }),
                    this.page.click(this.nextPageSelector)
                ]);
            } 
            catch {
                console.log(chalk.red('No more offers...'));
                break
            }
        };
        await this.browser.close();
        console.log(`Total offers founded: ${chalk.green(this.offers.length)}`);
        return this.offers;
    };

    async createJSON() {
        let JSONoffers = JSON.stringify(this.offers)
        fs.writeFile(`${this.website}-${this.city}.json`, JSONoffers, 'utf8', (err) => {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log(chalk.green("JSON file has been saved."));
        });
    };
};

module.exports = Scrapper;