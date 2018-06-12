const rp = require('request-promise');
const cheerio = require('cheerio');
const options = {
    url: "https://www.it-akademy.fr/",
    transform: (body) => {
        return cheerio.load(body);
    }
}
rp(options)
    .then(($) => {
        console.log($);
    })
    .catch((err) => {
        console.log(err);
    });
