import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/cards.module.css';

const Card = function Card({ info, type }) {
  const Url = (x) => {
    let url;
    if (type === 'movie') {
      url = `/${type}/${x.imdb_id}`;
      return url;
    }
    if (type === 'tv') {
      url = `/${type}/${x.imdb_id}`;
      return url;
    }
    return false;
  };

  return (
    <div className={styles.list_cards}>
      {info
        && info.map((x) => (
          <div key={x.title} className={styles.card}>
            <Link href={Url(x)}>
              <a href="replace" className={styles.image}>
                <Image
                  src={x.poster_path}
                  width={193}
                  height={300}
                  layout="intrinsic"
                  alt={x.title}
                />
              </a>
            </Link>
            <h6 className={styles.h6}>
              {x.title.slice(0, 25)}
              {' '}
            </h6>
          </div>
        ))}
    </div>
  );
};

export default Card;
