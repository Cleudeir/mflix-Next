import styles from "../styles/last_view.module.css";
function Last_view({ filmes }) {
  return (
    <div>
      <section
        className={styles.background}
        style={{
          backgroundImage: `url(${
            filmes[Math.floor(Math.random() * filmes.length)].backdrop_path
          })`,
        }}
      >
        <div className={styles.Vertical}>
          <div className={styles.horizontal}></div>
        </div>
      </section>
    </div>
  );
}

export default Last_view;
