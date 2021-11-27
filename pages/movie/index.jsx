import { useState, useEffect } from "react";
import Search_movies from "../../components/Search_movies";
import Cards from "../../components/Cards";
import styles from "../../styles/cards.module.css";
import Last_view from "../../components/Last_view";

const Movies = () => {
  const [movie_genre, set_movie_genre] = useState(false);
  const [movie_find, set_movie_find] = useState(false);
  const [movie, set_movie] = useState(false);
  const [genres, set_genres] = useState(false);
  const [render_genre, set_render_genre] = useState(0);

  const search = async () => {
    //Buscar
    const search_item = await Search_movies()
      .then((result) => result)
      .catch((data) => data);
    const result = await search_item;
    //--
    set_movie(result.movie);
    set_genres(result.genres);
    set_movie_genre(result.movie_genres);
  };

  useEffect(() => {
    if (localStorage.getItem("movie_genre")) {
      set_genres(JSON.parse(localStorage.getItem("genres")));
      set_movie_genre(JSON.parse(localStorage.getItem("movie_genre")));
      set_movie(JSON.parse(localStorage.getItem("movie")));
    } else {
      search();
    }
  }, []);

  console.log({ movie_genre, genres, movie, movie_find });

  const find = (e) => {
    let a = e;
    let b = a.toUpperCase();
    let c = movie.filter((x) => x.title.toUpperCase().slice(0, e.length) == b);
    if (c) {
      set_movie_find(c);
    }
    if (a === "") {
      set_movie_find(false);
    }
  };

  return (
    <>
      <div style={{ display: "flex",backgroundColor:'var(--cor-02)',justifyContent:'flex-start'}}>
        <input
          className={styles.myButton}
          type="text"
          onChange={(e) => {
            find(e.target.value);
          }}
        />
        {
          <div className={styles.category}>
            <select
              name="select"
              className={styles.myButton}
              onChange={(e) => {
                find("");
                set_render_genre(e.target.value);
              }}
            >
              {genres &&
                genres.map((x, i) => (
                  <option key={i} value={i}>
                    {x}
                  </option>
                ))}
            </select>
          </div>
        }
      </div>
      <div className={styles.conteiner}>
        {movie_genre && <Last_view filmes={movie_genre[render_genre]}  />}
        {movie_genre && Cards(movie_find)}
        {movie_genre && !movie_find && Cards(movie_genre[render_genre])}
      </div>
    </>
  );
};

export default Movies;
