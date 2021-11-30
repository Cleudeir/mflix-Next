import { useState, useEffect } from "react";
import Search from "./Search";
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
    const search_items = await Search(props);

    //--
    if (search_items.data.length > 0) {
      set_data(search_items.data);
      set_genres(search_items.genres);
      set_data_genre(search_items.data_genres);
    }
  };
  useEffect(() => {
    console.log("type:", type);
    let obj = JSON.parse(localStorage.getItem(`obj_${type}`));
    console.log(`obj_${type}`, obj);
    if (localStorage.getItem(`obj_${type}`)) {
      set_genres(obj.genres);
      set_data_genre(obj.data_genres);
      set_data(obj.data);
    } else {
      start(type);
    }
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
        />
      }
      <div className={styles.container}>
        {data_genre && <Last_view filmes={data_genre[render_genre]} />}
        {data_genre && Cards({ info: render_data_find, type: `${type}` })}
        {data_genre &&
          !render_data_find &&
          Cards({ info: data_genre[render_genre], type: `${type}` })}
      </div>
      {!data && (
        // eslint-disable-next-line @next/next/no-img-element
        /*<img
          style={{ position: "fixed",top:'0', width: "100%", height: "100vh",objectFit:'cover' }}
          src="https://cdn.dribbble.com/users/3787071/screenshots/15616036/media/12058e1977ccd7435b17cf2ba85095aa.gif"
          alt="loading"
        />*/
        <Image
          src="https://cdn.dribbble.com/users/3787071/screenshots/15616036/media/12058e1977ccd7435b17cf2ba85095aa.gif"
          objectFit="cover"
          layout="fill"
          alt="loading"
          quality={100}
          priority
        />
      )}
    </div>
  );
};

export default Pages;
