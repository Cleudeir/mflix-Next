function Crawling(req, res) {
  const puppeteer = require("puppeteer");
  const HtmlTableToJson = require("html-table-to-json");
  const fs = require("fs");
  (async () => {
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
    const array_id_sort = [];
    result.map((x) => {
      array_id_sort.push({
        id: x.IMDB,
        date: +x["Data de publicação"].slice(0, 4),
      });
    });
    //response
    const result_ids = [];
    const result_filter = array_id_sort.filter((x) => x.date >= 2021);
    result_filter.map((x) => result_ids.push(x.id));
    fs.writeFileSync(
      "./components/movie/library_movies.json",
      JSON.stringify(result_ids)
    );
    res.status(200).json(result_ids);
    await browser.close();
  })();
}

export default Crawling;
