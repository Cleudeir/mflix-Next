async function Filters({ type }) {
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
  // Criar Array com gêneros
  const genresSingle = new Set();
  data.map((item) => genresSingle.add(item.genres));
  let genres = Array.from(genresSingle).sort();
  //--
  // Criar Array categorizado por gênero
  let dataGenres = [];
  const vote = data.filter((x) => +x.vote_average > 0);
  for (let i = 0; i < genres.length; i += 1) {
    const genre = vote.filter((x) => x.genres === genres[i]);
    if (genre.length > 3) {
      dataGenres.push(genre.slice(0, 30));
    }
  }
  //--
  // add Lançamentos
  genres = ['Release', ...genres];
  const New = [];

  data.slice(0, 30).forEach((x) => (New.push({ ...x, genres: 'New' })));
  dataGenres = [New, ...dataGenres];
  //--
  const obj = { data, genres, dataGenres };
  return { ...obj };
}
export default Filters;
