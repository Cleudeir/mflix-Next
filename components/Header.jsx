import Link from "next/link";
import styles from "../styles/Header.module.css";
function Header_buttons({ genres, value_input, value_select }) {
  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
        }}
      >
        <Link href="/movie">
          <a className="myButton">Movie</a>
        </Link>
        <Link href="/tv">
          <a className="myButton">TvShow</a>
        </Link>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <input
          className="myButton"
          type="text"
          placeholder="Search"
          onChange={(e) => {
            value_input(e.target.value);
          }}
        />
        {
          <select
            name="select"
            //value={render_genre}
            className="myButton"
            onChange={(e) => {
              value_select(e.target.value);
              value_input("");
            }}
          >
            {genres &&
              genres.map((x, i) => (
                <option key={i} value={i}>
                  {x}
                </option>
              ))}
          </select>
        }
      </div>
    </div>
  );
}
export default Header_buttons;
