const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

// *[@id="property_info_data"]/div[2]/p

const hnocSearch = (searchString) => {
  (async () => {
    const browser = await puppeteer.launch({
      // headless: false,
    });
    const page = await browser.newPage();
    await page.goto('https://www.hnoc.org/vcs/', {
      waitUntil: 'networkidle2',
    });
    const inputSearch = '#simple_search_text';
    await page.click(inputSearch);
    await page.keyboard.type(searchString);
    await page.click('#simple_search_submit');
    await page.waitFor(2 * 2000);
    await page.click('[id^="lot_"] a');
    await page.waitFor(2 * 5000);

    // *[@id="property_info_data"]/div[2]/p
    // Captures relevant text information for the first ?1-3 hits form the search
    const innerText = await page.evaluate(() => document.querySelector($('#property_info_data')[0].innerText));
    console.log(innerText);
    await browser.close();

    return innerText;

    // save all the pages content
    // const html = await page.content();

    // save the file to the file system
    // fs.writeFile('./hnoc2.html', html, (err) => {
    //   if (err) {
    //     return console.log(err);
    //   }
    //   console.log('The file was saved!');
    // });

    // let scape = html.split("Vieux Carré Commission Evaluation:")
    // const $ = cheerio.load(html);
    // console.log(html);
    // console.log($);
  })();
};

// test call for address
// hnocSearch('620 Dumaine St.');

module.exports = {
  hnocSearch,
};
