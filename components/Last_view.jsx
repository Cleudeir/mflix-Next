import style from "../styles/last_view.module.css";
function Last_view({ filmes }) {
  return (
    <div>
      <section
        className={style.background}
        style={{
          backgroundImage: `url(${
            filmes[Math.floor(Math.random() * filmes.length)].backdrop_path
          })`,
        }}
      >
        <div className={style.Vertical}>
          <div className={style.horizontal}></div>
        </div>
      </section>
    </div>
  );
}

export default Last_view;
