import { useState, useEffect } from 'react';
import Cards from './Cards';
import styles from '../styles/cards.module.css';
import LastView from './Last_view';
import HeaderButtons from './Header';

const Pages = function Pages({ data, type }) {
  const [useData, setData] = useState(false);
  const [useBackGround, setBackGround] = useState(null);

  const start = async () => {
    // Buscar
    setData(data);

    const storage = localStorage.getItem(`lastView_${type}`);
    if (storage) {
      const [[filter]] = data.map((x) => x.filter((y) => y.imdb_id === storage))
        .filter((x) => x.length > 0);
      setBackGround(filter);
    } else {
      setBackGround(data[0][0]);
    }
  };
  const search = (e) => {
    const props = e;
    if (props === '') {
      setData(data);
    } else {
      console.log(props.length);
      const array = [];
      const filter = data.forEach((y) => {
        const a = y.filter((x) => x.title.toLowerCase().includes(props.toLowerCase()));
        if (a.length > 0) {
          a.forEach((x) => array.push({ ...x, genres: 'Results' }));
        }
      });

      setData([array]);
      console.log([array]);
    }
  };

  useEffect(() => {
    start();
  }, []);

  return (
    <div className="container">
      <HeaderButtons
        type={type}
        search={search}
      />
      <div className={styles.container}>
        {useBackGround && <LastView data={useBackGround} type={type} />}
        {useData && Cards({ data: useData, type: `${type}`, setBackGround })}
        {!useData && (
          <div>
            <img
              style={{
                width: '100%',
                height: '100vh',
                position: 'absolute',
                top: 0,
                right: 0,
                objectFit: 'cover',
              }}
              src="./carregando.gif"
              alt="gif"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Pages;
