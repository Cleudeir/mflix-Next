import { library_movies } from "../library/library_movies";
async function Search_movies() {
  const get_infos = async (props) => {
    let array_infos = [];
    for (let i = 0; i < props.length; i++) {
      let get_fetch = fetch(`/api/movie/${props[i].id}`)
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
  let get = await get_infos(library_movies.reverse().splice(0, 1000));

  let movie = get.filter((x) => x !== false).filter((x) => x.vote_average > 6);
  localStorage.setItem("movie", JSON.stringify(movie));
  //--
  //Criar Array com categorias dos filmes
  const genres_single = new Set();
  movie.map((item) => genres_single.add(item.genres));
  const genres = await Array.from(genres_single);
  localStorage.setItem("genres", JSON.stringify(genres));
  //--
  //Criar Array com filmes categorizados por genero
  const movie_genres = [];
  for (let i = 0; i < genres.length; i++) {
    movie_genres.push(movie.filter((x) => x.genres === genres[i]));
  }
  localStorage.setItem("movie_genre", JSON.stringify(movie_genres));
  //--

  return { movie, genres, movie_genres };
}

export default Search_movies;
