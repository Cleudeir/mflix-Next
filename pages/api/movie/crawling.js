const HtmlTableToJson = require("html-table-to-json");
function Crawling(req, res) {
  const puppeteer = require("puppeteer");

  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setJavaScriptEnabled(false);
    await page.goto("https://embed.uauflix.online/admin/todos-filmes");
    //await page.select('select[name="datatable-list_length"]', "100");
    const table = await page.evaluate(() => {
      return document.getElementById("datatable-list").innerHTML;
    });
    const mount = "<table>" + table + "</table>";

    //html to json
    const json = await HtmlTableToJson.parse(mount);
    const result = await json._results[0].reverse();
    //filter json
    const array_movie_id = [];
    result.map((x) => {
      array_movie_id.push({
        id: x.IMDB,
        date: +x["Data de publicação"].slice(0, 4),
      });
    });
    //response
    res.status(200).json(array_movie_id.filter((x) => x.date >= 2021));
    await browser.close();
  })();
}

export default Crawling;
