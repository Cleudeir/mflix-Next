import { useState, useEffect } from "react";
import Search_movies from "./Search_movies";
import Image from "next/image";
import styles from "../styles/cards.module.css";
import Link from "next/link";
const Cards_movies = () => {
  const [movie_by_genre, set_movie_by_genre] = useState(false);
  const [movie_find, set_movie_find] = useState(false);
  const [movie, set_movie] = useState(false);
  const [genres, set_genres] = useState(false);
  const [category, set_category] = useState(0);

  const search = async () => {
    //Buscar
    const search_item = await Search_movies()
      .then((result) => result)
      .catch((data) => data);
    //--
    //Receber busca e filtrar
    const result = await Promise.all(search_item).then((x) => x);
    const filter_result = result
      .filter((x) => x !== false)
      .filter((x) => x.vote_average > 6);
    set_movie(filter_result);
    localStorage.setItem("movie", JSON.stringify(filter_result));
    //---
    //Criar Array com categorias dos filmes
    const genres_single = new Set();
    filter_result.map((item) => genres_single.add(item.genres));
    const filter_genres = Array.from(genres_single);
    set_genres(filter_genres);
    localStorage.setItem("genres", JSON.stringify(filter_genres));
    //Criar Array com filmes categorizados por genero
    const filter_movie_by_genre = [];
    for (let i = 0; i < filter_genres.length; i++) {
      filter_movie_by_genre.push(
        filter_result.filter((x) => x.genres === filter_genres[i])
      );
    }
    set_movie_by_genre(filter_movie_by_genre);
    localStorage.setItem(
      "movie_by_genre",
      JSON.stringify(filter_movie_by_genre)
    );
    //---
  };

  useEffect(() => {
    let restory = JSON.parse(localStorage.getItem("movie_by_genre"));
    if (restory) {
      set_genres(JSON.parse(localStorage.getItem("genres")));
      set_movie_by_genre(restory);
      set_movie(JSON.parse(localStorage.getItem("movie")));
    } else {
      search();
    }
  }, []);

  console.log("movie_by_genre:", movie_by_genre);
  console.log("genres:", genres);
  console.log("movie:", movie);
  console.log("movie_find:", movie_find);

  const cards = () => {
    return (
      <div className={styles.list_cards}>
        {movie_by_genre[category].map((x, i) => {
          return (
            <div key={i} className={styles.card}>
              <Link href={`/movie/${x.imdb_id}`}>
                <a className={styles.image}>
                  <Image
                    src={x.poster_path}
                    width={200}
                    height={300}
                    layout="intrinsic"
                    alt={x.title}
                  />
                </a>
              </Link>
              <h6 className={styles.h6}>{x.title.slice(0, 25)} </h6>
            </div>
          );
        })}
      </div>
    );
  };

  const category_select = () => {
    return (
      <div className={styles.category}>
        <select
          name="select"
          className={styles.myButton}
          onChange={(e) => set_category(e.target.value)}
        >
          {genres.map((x, i) => (
            <option key={i} value={i}>
              {x}
            </option>
          ))}
        </select>
      </div>
    );
  };
  const search_input = () => {
    const find = (e) => {
      let a = e;
      let b = a.toUpperCase();
      let c = movie.filter((x) => x.title.toUpperCase() == b);
      set_movie_find(c[0]);
      console.log(c[0], e);
    };
    return (
      <div className={styles.myButton}>
        <input type="text" onChange={(e) => find(e.target.value)} />
        {movie_find && (
          <div className={styles.card}>
            <Link href={`/movie/${movie_find.imdb_id}`}>
              <a className={styles.image}>
                <Image
                  src={movie_find.poster_path}
                  width={200}
                  height={300}
                  layout="intrinsic"
                  alt={movie_find.title}
                />
              </a>
            </Link>
            <h6 className={styles.h6}>{movie_find.title.slice(0, 25)} </h6>
          </div>
        )}
      </div>
    );
  };
  return (
    <div className={styles.conteiner}>
      {search_input()}
      {genres && !movie_find && category_select()}
      {movie_by_genre && !movie_find && cards()}
    </div>
  );
};

export default Cards_movies;
