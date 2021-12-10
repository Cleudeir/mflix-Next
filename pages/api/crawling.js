function Crawling(req, res) {
  const puppeteer = require("puppeteer");
  const HtmlTableToJson = require("html-table-to-json");
  const fs = require("fs");
  (async () => {
    const search = async (props) => {
      const browser = await puppeteer.launch(
        process.env.NODE_ENV === "production"
          ? {
              args: chrome.args,
              executablePath: await chrome.executablePath,
              headless: chrome.headless,
            }

          : {}
      );
      const page = await browser.newPage();
      await page.setJavaScriptEnabled(false);
      await page.goto(props.link);
      const table = await page.evaluate(() => {
        return document.getElementById("datatable-list").innerHTML;
      });
      const mount = "<table>" + table + "</table>";

      //html to json
      const json = await HtmlTableToJson.parse(mount);
      const result = await json._results[0].reverse();

      //--
      const array_id_sort = [];
      const result_ids = [];
      if (props.type === "movie") {
        result.map((x) => {
          array_id_sort.push({
            id: x.IMDB,
            date: +x['Data de publicação'].slice(0, 4),
          });
        });
        const result_filter = array_id_sort
          .filter((x) => x.date >= 2021)
          .filter((x) => x !== false);
        result_filter.map((x) => result_ids.push(x.id));

        fs.writeFileSync("./data/ids_movie.json", JSON.stringify(result_ids));
      }
      //--
      if (props.type === "tv") {
        result.map((x) => {
          array_id_sort.push({
            id: x['ID - THEMOVIEDB'],
            date: +x["Última atualização"].slice(0, 4),
          });
        });
        const result_filter = array_id_sort
          .filter((x) => x.date >= 2019)
          .filter((x) => x !== false);
        result_filter.map((x) => result_ids.push(x.id));
        fs.writeFileSync("./data/ids_tv.json", JSON.stringify(result_ids));
      }
      await browser.close();
      return result_ids;
    };

    //response

    res.status(200).json({
      search_movie: await search({
        link: "https://embed.uauflix.online/admin/todos-filmes",
        type: "movie",
      }),
      search_tv: await search({
        link: "https://embed.uauflix.online/admin/todas-series",
        type: "tv",
      }),
    });
  })();
}

export default Crawling;
