import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/lastView.module.css';

const LastView = function LastView({ data, type }) {
  const [last, setLast] = useState(false);
  useEffect(() => {
    const storage = localStorage.getItem(`lastView_${type}`);
    if (storage) {
      const filter = data.filter((x) => x.imdb_id === storage)[0];
      setLast(filter);
    } else {
      setLast(data[0]);
    }
  }, []);

  return (
    last && (
      <div className={styles.container}>
        <section
          className={styles.background}
          style={{
            backgroundImage: `url(${last.backdrop_path})`,
          }}
        >
          <div className={styles.Vertical} />
          <div
            style={{
              position: 'absolute',
              top: '5vh',
              color: 'white',
              marginLeft: '20px',
              zIndex: '2',
              maxHeight: '10vh',
            }}
          >
            <h1>{last.title}</h1>
            <p style={{ width: '320px' }}>
              {last.overview.slice(0, 250)}
              ...
            </p>
            <Link href={`/${type}/${last.imdb_id}`}>
              <a href="replace" style={{ width: '75px' }} className="myButton">
                Play
              </a>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h5>
                Rate:
                {last.vote_average}
              </h5>
              -
              <h5>
                Genre:
                {last.genres}
              </h5>
            </div>
          </div>
        </section>
      </div>
    )
  );
};

export default LastView;
