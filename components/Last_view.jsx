import Link from 'next/link';
import styles from '../styles/lastView.module.css';

const LastView = function LastView({ data, type }) {
  return (
    data && (
      <div className={styles.container}>
        <section
          className={styles.background}
          style={{
            backgroundImage: `url(${data.backdrop_path})`,
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
            <h1>{data.title}</h1>
            <p style={{ width: '320px' }}>
              {data.overview.slice(0, 250)}
              ...
            </p>
            <Link href={`/${type}/${data.imdb_id}`}>
              <a href="replace" style={{ width: '75px' }} className="myButton">
                Play
              </a>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center' }}>

              {+data.vote_average === 0 ? '' : `Rate: ${data.vote_average}` }

              { ` Genre: ${data.genres}`}

            </div>
          </div>
        </section>
      </div>
    )
  );
};

export default LastView;
