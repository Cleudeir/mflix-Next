async function Search() {
  //library get
  const library = require("./library_movies.json");
  //--
  console.log("library", library);
  const get_infos = async (props) => {
    let array_infos = [];
    for (let i = 0; i < props.length; i++) {
      let get_fetch = fetch(`/api/movie/${props[i]}`)
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

  let movie = get.filter((x) => x !== false);

  //--
  //Criar Array com categorias dos filmes
  const genres_single = new Set();
  movie.map((item) => genres_single.add(item.genres));
  const genres = await Array.from(genres_single).sort();

  //Criar Array com filmes categorizados por genero
  const movie_genres_no_sort = [];
  for (let i = 0; i < genres.length; i++) {
    movie_genres_no_sort.push(movie.filter((x) => x.genres === genres[i]));
  }
  const movie_genres = [];
  for (let j = 0; j < movie_genres_no_sort.length; j++) {
    movie_genres.push(
      movie_genres_no_sort[j]
        .sort(function (a, b) {
          return a.vote_average - b.vote_average;
        })
        .reverse()
    );
  }
  //--
  if (movie.length > 0) {
    localStorage.setItem("movie", JSON.stringify(movie));
    localStorage.setItem("genres", JSON.stringify(genres));
    localStorage.setItem("movie_genre", JSON.stringify(movie_genres_no_sort));
  }

  //--
  console.log({ movie, genres, movie_genres });

  return { movie, genres, movie_genres };
}

export default Search;
