import { useState, useEffect } from "react";
import Filters from "./Filters";
import Cards from "./Cards";
import styles from "../styles/cards.module.css";
import Last_view from "./Last_view";
import Header_buttons from "./Header";
import Image from "next/image";

const Pages = ({ type }) => {
  const [data, set_data] = useState(false);
  const [data_genre, set_data_genre] = useState(false);
  const [genres, set_genres] = useState(false);
  const [render_data_find, set_render_data_find] = useState(false);
  const [render_genre, set_render_genre] = useState(0);

  const start = async (props) => {
    //Buscar
    console.log("start", props);
    const search_items = await Filters(props);
    //--
    set_data(search_items.data);
    set_genres(search_items.genres);
    set_data_genre(search_items.data_genres);
  };
  useEffect(() => {
    localStorage.clear();
    start(type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const value_input = (props) => {
    console.log(props);
    let b = props.toUpperCase();
    let c = data.filter(
      (x) => x.title.toUpperCase().slice(0, props.length) == b
    );
    if (c) {
      set_render_data_find(c);
    }
    if (props === "") {
      set_render_data_find(false);
    }
  };
  const value_select = (props) => {
    set_render_genre(props);
    localStorage.setItem(`render_genre_${type}`, JSON.stringify(props));
  };
  return (
    <div className="container">
      {
        <Header_buttons
          genres={genres}
          value_input={value_input}
          value_select={value_select}
          type={type}
        />
      }
      <div className={styles.container}>
        {data_genre && <Last_view filmes={data_genre[render_genre]} />}
        {data_genre && Cards({ info: render_data_find, type: `${type}` })}
        {data_genre &&
          !render_data_find &&
          Cards({ info: data_genre[render_genre], type: `${type}` })}
      </div>
    </div>
  );
};

export default Pages;
