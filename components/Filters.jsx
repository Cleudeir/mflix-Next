async function Filters(type) {
  //library get
  console.log("type", type);
  const library =await require(`../data/data_${type}.json`);
  //--
  let get = await library
  let data = get.filter((x) => x !== false);
  //--
  //Criar Array com generos
  const genres_single = new Set();
  data.map((item) => genres_single.add(item.genres));
  const genres = await Array.from(genres_single).sort();
  //Criar Array categorizado por genero
  const movie_genres_no_sort = [];
  for (let i = 0; i < genres.length; i++) {
    movie_genres_no_sort.push(data.filter((x) => x.genres === genres[i]));
  }
  const data_genres = [];
  for (let j = 0; j < movie_genres_no_sort.length; j++) {
    data_genres.push(
      movie_genres_no_sort[j]
        .sort(function (a, b) {
          return a.vote_average - b.vote_average;
        })
        .reverse()
    );
  }
  const obj = { data, genres, data_genres };
  console.log({ ...obj })
  return { ...obj };
}
export default Filters;
