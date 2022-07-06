import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/cards.module.css';

const Card = function Card({ data, type, setBackGround }) {
  const Url = (x) => {
    let url;
    if (type === 'movie') {
      url = `/${type}/${x.imdb_id}`;
      return url;
    }
    if (type === 'tv') {
      url = `/${type}/${x.imdb_id}/${x.seasons}`;
      return url;
    }
    return false;
  };

  return (
    <div className={styles.container}>
      {data[0].length > 0 && data.map((info, i) => (
        <div key={i}>
          <h1 style={{ color: 'white' }}>
            {info[0].genres}
          </h1>
          <div className={styles.conteinerList} key={i}>
            <div className={styles.list_cards}>
              { info.map((x, j) => (
                <div
                  key={x.title + j}
                  className={styles.card}
                  onMouseOver={() => { setBackGround(x); }}
                  onFocus={() => { setBackGround(x); }}
                >
                  <Link href={Url(x)}>
                    <a href="replace">
                      <Image
                        className={styles.image}
                        src={x.poster_path}
                        width={193}
                        height={300}
                        layout="intrinsic"
                        alt={x.title}
                      />
                    </a>
                  </Link>
                  <h6 className={styles.h6}>
                    {x.title.slice(0, 15)}
                  </h6>
                </div>
              ))}
            </div>
          </div>
        </div>

      ))}
    </div>
  );
};

export default Card;
