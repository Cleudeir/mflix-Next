/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
function Crawling(req, resp) {
 	const type = req.body
	let arrayIdSort = [];
	let resultIds = [];
	let resultFilter = [];
	const Crawler = require("crawler");
	const HtmlTableToJson = require('html-table-to-json');

	const c = new Crawler({
	maxConnections : 5,
	// This will be called for each crawled page
	callback : function (error, res, done) {
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
				if (type === 'movie') {
					result.map((x) => {
						arrayIdSort.push({
							id: x.IMDB,
							date: +x['Data de publicação'].slice(0, 4),
						});                    
					});
						resultFilter = arrayIdSort
						.filter((x) => x.date >= 2021)
						.filter((x) => x !== false);
					resultFilter.map((x) => resultIds.push(x.id));
				}
				//--
				if (type === 'tv') {
					result.map((x) => {
						arrayIdSort.push({
							id: x['ID - THEMOVIEDB'],
							date: +x['Última atualização'].slice(0, 4),
						});                   
					});
						resultFilter =  arrayIdSort
						.filter((x) => x.date >= 2021)
						.filter((x) => x !== false);
					resultFilter.map((x) => resultIds.push(x.id));                  
				}      
				resp.status(200).json(resultIds.slice(0, 500));          
		}
	}
	});
	if (type === 'movie') {
	c.queue('https://embed.uauflix.online/admin/todos-filmes')
	console.log('type',type)
	}
	if (type === 'tv') {
	c.queue('https://embed.uauflix.online/admin/todas-series')
	console.log('type',type)
	}
}

export default Crawling;
