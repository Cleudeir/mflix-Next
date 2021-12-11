import { useState, useEffect } from 'react';
import Filters from './Filters';
import Cards from './Cards';
import styles from '../styles/cards.module.css';
import LastView from './Last_view';
import HeaderButtons from './Header';

const Pages = function Pages({ type }) {
  const [data, setData] = useState(false);
  const [dataGenre, setDataGenre] = useState(false);
  const [genres, setGenres] = useState(false);
  const [renderDataFind, setRenderDataFind] = useState(false);
  const [renderGenre, setRenderGenre] = useState(0);

  const start = async (props) => {
    // Buscar
    const searchItems = await Filters(props);
    //--
    setData(searchItems.data);
    setGenres(searchItems.genres);
    setDataGenre(searchItems.dataGenres);
    if (localStorage.getItem(`renderGenre_${type}`)) {
      setRenderGenre(+localStorage.getItem(`renderGenre_${type}`));
    }
  };
  useEffect(() => {
    start(type);
  }, []);
  const valueInput = (props) => {
    const b = props.toUpperCase();
    const c = data.filter(
      (x) => x.title.toUpperCase().slice(0, props.length) === b,
    );
    if (c) {
      setRenderDataFind(c);
    }
    if (props === '') {
      setRenderDataFind(false);
    }
  };
  const valueSelect = (props) => {
    setRenderGenre(props);
    localStorage.setItem(`renderGenre_${type}`, props);
  };
  return (
    <div className="container">
      <HeaderButtons
        genres={genres}
        valueInput={valueInput}
        valueSelect={valueSelect}
        type={type}
        atualizarSelect={renderGenre}
      />
      <div className={styles.container}>
        {data && <LastView data={data} type={type} />}
        {dataGenre && Cards({ info: renderDataFind, type: `${type}` })}
        {dataGenre
          && !renderDataFind
          && Cards({ info: dataGenre[renderGenre], type: `${type}` })}
      </div>
    </div>
  );
};

export default Pages;
