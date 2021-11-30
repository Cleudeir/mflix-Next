import styles from "../styles/lastView.module.css";
function Last_view({ filmes }) {
  return (
    <div className={styles.container}>
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
