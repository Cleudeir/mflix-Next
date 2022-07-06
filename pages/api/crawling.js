/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const Crawler = require('crawler');
const HtmlTableToJson = require('html-table-to-json');

function Crawling(req, resp) {
  const type = req.body;
  const arrayIdSort = [];
  const resultIds = [];
  let resultFilter = [];

  const c = new Crawler({
    maxConnections: 5,
    // This will be called for each crawled page
    callback(error, res, done) {
      if (error) {
        console.log(error);
      } else {
        const { $ } = res;
        const table = $('table').html();
        const mount = `<table>${table}</table>`;
        // html to json
        const json = HtmlTableToJson.parse(mount);
        const result = json._results[0].reverse();
        // --
        if (type === 'movie') {
          result.foreach((x) => {
            arrayIdSort.push({
              id: x.IMDB,
              date: +x['Data de publicação'].slice(0, 4),
            });
          });
          resultFilter = arrayIdSort
            .filter((x) => x.date >= 2021)
            .filter((x) => x !== false);
          resultFilter.foreach((x) => resultIds.push(x.id));
        }
        //--
        if (type === 'tv') {
          result.foreach((x) => {
            arrayIdSort.push({
              id: x['ID - THEMOVIEDB'],
              date: +x['Última atualização'].slice(0, 4),
            });
          });
          resultFilter = arrayIdSort
            .filter((x) => x.date >= 2021)
            .filter((x) => x !== false);
          resultFilter.foreach((x) => resultIds.push(x.id));
        }
        resp.status(200).json(resultIds.slice(0, 50));
      }
    },
  });
  if (type === 'movie') {
    c.queue('https://embed.uauflix.online/admin/todos-filmes');
  }
  if (type === 'tv') {
    c.queue('https://embed.uauflix.online/admin/todas-series');
  }
}

export default Crawling;
