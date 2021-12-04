import Link from "next/link";
import styles from "../styles/Header.module.css";
function Header_buttons({ genres, value_input, value_select, type, atualizarSelect }) {
  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
        }}
      >
        {type === "tv" && (
          <Link href="/movie">
            <a style={{ width: "75px" }} className="myButton">
              Movie
            </a>
          </Link>
        )}
        {type === "movie" && (
          <Link href="/tv">
            <a style={{ width: "75px" }} className="myButton">
              TvShow
            </a>
          </Link>
        )}
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <input
          style={{ width: "80px" }}
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
            value={atualizarSelect}
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
