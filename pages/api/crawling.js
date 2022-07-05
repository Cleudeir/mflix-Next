/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
function Crawling(req, res) {
 
  (async () => {
    console.log("Crawling")
    const search = async (props) => {
    let arrayIdSort = [];
    let resultIds = [];
    let resultFilter = [];
    const Crawler = require("crawler");
    const fs = require('fs');
    const HtmlTableToJson = require('html-table-to-json');

    const c = new Crawler({
        maxConnections : 5,
        // This will be called for each crawled page
        callback : async function (error, res, done) {
            if(error){
                console.log(error);
            }else{
              const $ = res.$;
              const table = $('table').html();
              const mount = `<table>${table}</table>`;
               // html to json
               const json = HtmlTableToJson.parse(mount);
               const result = json._results[0].reverse();
               //--
               
                if (props.type === 'movie') {
                  result.map((x) => {
                    arrayIdSort.push({
                      id: x.IMDB,
                      date: +x['Data de publicação'].slice(0, 4),
                    });
                    return false;
                  });
                   resultFilter = arrayIdSort
                    .filter((x) => x.date >= 2021)
                    .filter((x) => x !== false);
                  resultFilter.map((x) => resultIds.push(x.id));
                  console.log(resultIds)
                  fs.writeFileSync('./data/ids_movie.json', JSON.stringify(resultIds));
                }
                //--
                if (props.type === 'tv') {
                  result.map((x) => {
                    arrayIdSort.push({
                      id: x['ID - THEMOVIEDB'],
                      date: +x['Última atualização'].slice(0, 4),
                    });
                    return false;
                  });
                   resultFilter =  arrayIdSort
                    .filter((x) => x.date >= 2019)
                    .filter((x) => x !== false);
                  resultFilter.map((x) => resultIds.push(x.id));
                  console.log(resultIds)
                   fs.writeFileSync('./data/ids_tv.json', JSON.stringify(resultIds));
                }               
            }
            await done();
          }
        });
      if (props.type === 'movie') {
      c.queue('https://embed.uauflix.online/admin/todos-filmes')
      }
      if (props.type === 'tv') {
        c.queue('https://embed.uauflix.online/admin/todas-series')
      }
      return resultIds;
    };



    res.status(200).json({
      search_movie: await search({
        link: 'https://embed.uauflix.online/admin/todos-filmes',
        type: 'movie',
      }),
      search_tv: await search({
        link: 'https://embed.uauflix.online/admin/todas-series',
        type: 'tv',
      }),
    });
  })();
}

export default Crawling;
