import { useState, useEffect } from "react";
import Search from "../../components/movie/Search";
import Cards from "../../components/Cards";
import styles from "../../styles/cards.module.css";
import Last_view from "../../components/Last_view";
import Header_buttons from "../../components/Header_buttons";

const Movies = () => {
  const [movie_genre, set_movie_genre] = useState(false);
  const [movie_find, set_movie_find] = useState(false);
  const [movie, set_movie] = useState(false);
  const [genres, set_genres] = useState(false);
  const [render_genre, set_render_genre] = useState(0);

  const search = async () => {
    //Buscar
    const search_item = await Search();
    console.log(search_item);
    //--
    if (search_item.movie.length > 0) {
      set_movie(search_item.movie);
      set_genres(search_item.genres);
      set_movie_genre(search_item.movie_genres);
    }
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

  const value_input = (props) => {
    console.log(props);
    let b = props.toUpperCase();
    let c = movie.filter(
      (x) => x.title.toUpperCase().slice(0, props.length) == b
    );
    if (c) {
      set_movie_find(c);
    }
    if (props === "") {
      set_movie_find(false);
    }
  };
  const value_select = (props) => {
    console.log(props);
    set_render_genre(props);
    localStorage.setItem('render_genre',JSON.stringify(props))
  };

  return (
    <>
      {genres && (
        <Header_buttons
          genres={genres}
          value_input={value_input}
          value_select={value_select}
        />
      )}
      <div className={styles.conteiner}>
        {movie_genre && <Last_view filmes={movie_genre[render_genre]} />}
        {movie_genre && Cards(movie_find)}
        {movie_genre && !movie_find && Cards(movie_genre[render_genre])}
      </div>
    </>
  );
};

export default Movies;
