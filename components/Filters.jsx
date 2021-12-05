async function Filters(type) {
  //library get
  console.log("type", type);
  const library = await require(`../data/data_${type}.json`);
  //--
  let get = await library;
  let data = get;
  //--
  //Criar Array com generos
  const genresSingle = new Set();
  data.map((item) => genresSingle.add(item.genres));
  const genres = await Array.from(genresSingle).sort();
  //--
  //Criar Array categorizado por genero
  const dataGenres = [];
  for (let i = 0; i < genres.length; i++) {
    dataGenres.push(data.filter((x) => x.genres === genres[i]));
  }
  //--
  //add Lançamentos
  genres = ["Release", ...genres];
  dataGenres = [data.slice(0, 10), ...dataGenres];
  //--
  const obj = { data, genres, dataGenres };
  console.log({ ...obj });
  return { ...obj };
}
export default Filters;
