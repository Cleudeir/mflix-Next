import { useState, useEffect } from 'react';
import Filters from './Filters';
import Cards from './Cards';
import styles from '../styles/cards.module.css';
import LastView from './Last_view';
import HeaderButtons from './Header';

const Pages = function Pages({ type }) {
  const [useData, setData] = useState(false);
  const [renderGenre, setRenderGenre] = useState(0);
  const [useBackGround, setBackGround] = useState(null);

  const start = async (props) => {
    // Buscar
    const { dataGenres } = await Filters(props);
    //--
    setData(dataGenres);
    if (localStorage.getItem(`renderGenre_${type}`)) {
      setRenderGenre(+localStorage.getItem(`renderGenre_${type}`));
    }
    const storage = localStorage.getItem(`lastView_${type}`);
    if (storage) {
      const [[filter]] = dataGenres.map((x) => x.filter((y) => y.imdb_id === storage))
        .filter((x) => x.length > 0);
      setBackGround(filter);
    } else {
      setBackGround(dataGenres[0][0]);
    }
  };
  useEffect(() => {
    start(type);
  }, []);

  const valueSelect = (props) => {
    setRenderGenre(props);
    localStorage.setItem(`renderGenre_${type}`, props);
  };
  return (
    <div className="container">
      <HeaderButtons
        valueSelect={valueSelect}
        type={type}
        atualizarSelect={renderGenre}
      />
      <div className={styles.container}>
        {useBackGround && <LastView data={useBackGround} type={type} />}
        {useData && Cards({ data: useData, type: `${type}`, setBackGround })}
      </div>
    </div>
  );
};

export default Pages;
