const puppeteer = require('puppeteer');
const fs = require('fs');

const websiteUrl = 'https://jbzdy.cc';
const memes = []
getMemes = async (pagesNum = 1) => {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    await page.goto(websiteUrl);
    for (let i = 1; i <= pagesNum; i++){
        console.log(`Searching page: ${i}...`)
        const memesHandler = await page.$$('#content-container > article');
        const memesData = memesHandler.map( async mem =>{
            const memTitle = await mem.$$('.article-content')
            const title = await memTitle[0].$eval('.article-title', el => el.innerText);
            const link = await memTitle[0].$eval('.article-title > a', el => el.getAttribute('href'))
            return  {
                title,
                link
            }
        })
        await Promise.all(memesData).then(result => {
            result.map((mem) => {
                memes.push(mem)
            })})
        await Promise.all([
            page.waitForNavigation({
                waitUntil: 'domcontentloaded'
            }),
            page.goto(`https://jbzdy.cc/str/${i}`)])
    }
    let JSONmemes = JSON.stringify(memes)
    //console.log(memes)
    fs.writeFile("memes.json", JSONmemes, 'utf8', (err) => {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("JSON file has been saved.");
    });
    console.log(`Total memes founded: ${memes.length}`)
    await browser.close();
}

getMemes(100)

