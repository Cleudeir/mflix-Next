import style from '../styles/Last_view.module.css'
function Last_view({ filme }) {
  return (
    <div>
      <section
      className={style.background}
        style={{
          height: "70vh",
          backgroundImage: `url(${filme.backdrop_path})`,
          width:'100vw',
          objectFit:'cover',
          backgroundPosition: 'center'
        }}
      >
          <div className={style.Vertical}>

          </div>
      </section>
    </div>
  );
}

export default Last_view;
