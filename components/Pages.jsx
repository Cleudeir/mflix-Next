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
  useEffect(() => {
    start();
  }, []);

  return (
    <div className="container">
      <HeaderButtons
        type={type}
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
