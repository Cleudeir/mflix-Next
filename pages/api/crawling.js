/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
function Crawling(req, res) {
  const puppeteer = require('puppeteer');
  const HtmlTableToJson = require('html-table-to-json');
  const fs = require('fs');
  (async () => {
    const search = async (props) => {
      const browser = await puppeteer.launch(
        process.env.NODE_ENV === 'production'
          ? {
            args: chrome.args,
            executablePath: await chrome.executablePath,
            headless: chrome.headless,
          }

          : {},
      );
      const page = await browser.newPage();
      await page.setJavaScriptEnabled(false);
      await page.goto(props.link);
      const table = await page.evaluate(() => document.getElementById('datatable-list').innerHTML);
      const mount = `<table>${table}</table>`;

      // html to json
      const json = await HtmlTableToJson.parse(mount);
      const result = await json._results[0].reverse();

      //--
      const arrayIdSort = [];
      const resultIds = [];
      if (props.type === 'movie') {
        result.map((x) => {
          arrayIdSort.push({
            id: x.IMDB,
            date: +x['Data de publicação'].slice(0, 4),
          });
          return false;
        });
        const resultFilter = arrayIdSort
          .filter((x) => x.date >= 2021)
          .filter((x) => x !== false);
        resultFilter.map((x) => resultIds.push(x.id));

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
        const resultFilter = arrayIdSort
          .filter((x) => x.date >= 2019)
          .filter((x) => x !== false);
        resultFilter.map((x) => resultIds.push(x.id));
        fs.writeFileSync('./data/ids_tv.json', JSON.stringify(resultIds));
      }
      await browser.close();
      return resultIds;
    };

    // response

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
