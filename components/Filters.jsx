async function Filters(type) {
  //library get
  console.log("type", type);
  const library = await require(`../data/data_${type}.json`);
  //--
  let get = await library;
  let data = get;
  //--
  //Criar Array com generos
  const genres_single = new Set();
  data.map((item) => genres_single.add(item.genres));
  const genres = await Array.from(genres_single).sort();
  //--
  //Criar Array categorizado por genero
  const data_genres = [];
  for (let i = 0; i < genres.length; i++) {
    data_genres.push(data.filter((x) => x.genres === genres[i]));
  }
  //--
  //add Lançamentos
  genres = ["Lançamentos", ...genres];
  data_genres = [data.slice(0, 8), ...data_genres];
  //--
  /*
  const data_genres = [];
  for (let j = 0; j < data_genres.length; j++) {
    data_genres.push(
      data_genres[j]
        .sort(function (a, b) {
          return a.vote_average - b.vote_average;
        })
        .reverse()
    );
  }*/
  const obj = { data, genres, data_genres };
  console.log({ ...obj });
  return { ...obj };
}
export default Filters;
