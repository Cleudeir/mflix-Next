import Image from "next/image";
import Link from "next/link";
import styles from "../styles/cards.module.css";
function Card(props) {
  return (
    <div className={styles.list_cards}>
      {props &&
        props.map((x, i) => {
          return (
            <div key={i} className={styles.card}>
              <Link href={`/movie/${x.imdb_id}`}>
                <a className={styles.image}>
                  <Image
                    src={x.poster_path}
                    width={193}
                    height={300}
                    layout="intrinsic"
                    alt={x.title}
                  />
                  </a>
              </Link>
                  <h6 className={styles.h6}>{x.title.slice(0, 25)} </h6>
            </div>
          );
        })}
    </div>
  );
}

export default Card;
