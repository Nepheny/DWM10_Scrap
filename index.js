const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const stream = fs.createWriteStream('data/urls.json', {flags:'a'});
const options = {
    url: "https://www.it-akademy.fr/",
    transform: (body) => {
        return cheerio.load(body);
    }
}
rp(options)
    .then(($) => {
        stream.write('[');
        let length = $('a.program-overlayed').length;
        $('a.program-overlayed').each(function(i, el) {
            stream.write(
                JSON.stringify({
                    "id": i,
                    "name": $(this).text(),
                    "url": options.url + $(this).attr('href')
                })
            );
            if(i !== length - 1) {
                stream.write(',');
            }
        })
        stream.write(']');
    })
    .catch((err) => {
        console.log(err);
    });
