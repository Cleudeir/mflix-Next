async function Search(type) {
  //library get
  console.log("type", type);
  const library =await require(`./library_${type}.json`);
  //--
  console.log("library", library);
  const get_infos = async (props) => {
    let array_infos = [];
    for (let i = 0; i < props.length; i++) {
      let get_fetch = fetch(`/api/${type}/${props[i]}`)
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          return data;
        });
      array_infos.push(get_fetch);
    }
    return Promise.all(array_infos).then((x) => x);
  };
  //Buscar
  let get = await get_infos(library);
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
  //--
  if (data.length > 0) {
    localStorage.setItem(`obj_${type}`, JSON.stringify({ ...obj }));
  }
  //--
  return { ...obj };
}
export default Search;
