import { useState, useEffect } from "react";
import Filters from "./Filters";
import Cards from "./Cards";
import styles from "../styles/cards.module.css";
import Last_view from "./Last_view";
import Header_buttons from "./Header";
const Pages = ({ type }) => {
  const [data, setData] = useState(false);
  const [dataGenre, setDataGenre] = useState(false);
  const [genres, setGenres] = useState(false);
  const [renderDataFind, setRenderDataFind] = useState(false);
  const [renderGenre, setRenderGenre] = useState(0);

  const start = async (props) => {
    //Buscar
    console.log("start", props);
    const search_items = await Filters(props);
    //--
    setData(search_items.data);
    setGenres(search_items.genres);
    setDataGenre(search_items.dataGenres);
    if (localStorage.getItem(`renderGenre_${type}`)) {
      setRenderGenre(+localStorage.getItem(`renderGenre_${type}`));
    }
  };
  useEffect(() => {
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
      setRenderDataFind(c);
    }
    if (props === "") {
      setRenderDataFind(false);
    }
  };
  const value_select = (props) => {
    setRenderGenre(props);
    localStorage.setItem(`renderGenre_${type}`, props);
  };
  return (
    <div className="container">
      {
        <Header_buttons
          genres={genres}
          value_input={value_input}
          value_select={value_select}
          type={type}
          atualizarSelect={renderGenre}
        />
      }
      <div className={styles.container}>
        {data && <Last_view data={data} type={type} />}
        {dataGenre && Cards({ info: renderDataFind, type: `${type}` })}
        {dataGenre &&
          !renderDataFind &&
          Cards({ info: dataGenre[renderGenre], type: `${type}` })}
      </div>
    </div>
  );
};

export default Pages;
