/* eslint-disable no-loop-func */
/* eslint-disable global-require */
async function Filters(type) {
  // library get
  let library = '';
  if (type === 'movie') {
    library = require('../data/data_movie.json');
  }

  if (type === 'tv') {
    library = require('../data/data_tv.json');
  }

  //--
  const get = library;
  const data = get;
  //--
  // Criar Array com generos
  const genresSingle = new Set();
  data.map((item) => genresSingle.add(item.genres));
  let genres = Array.from(genresSingle).sort();
  //--
  // Criar Array categorizado por genero
  let dataGenres = [];
  for (let i = 0; i < genres.length; i += 1) {
    dataGenres.push(data.filter((x) => x.genres === genres[i]));
  }
  //--
  // add Lançamentos
  genres = ['Release', ...genres];
  dataGenres = [data.slice(0, 8), ...dataGenres];
  //--
  const obj = { data, genres, dataGenres };
  return { ...obj };
}
export default Filters;
