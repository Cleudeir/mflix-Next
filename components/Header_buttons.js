import Link from "next/link";
import styles from "../styles/cards.module.css";
function Header_buttons({ genres, value_input, value_select }) {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "var(--cor-02)",
        justifyContent: "flex-start",
      }}
    >
      <Link href="/">
        <a className="myButton">Home</a>
      </Link>
      <input
        className="myButton"
        type="text"
        placeholder="Search"
        onChange={(e) => {
          value_input(e.target.value);
        }}
      />
      {
        <div className={styles.category}>
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
        </div>
      }
    </div>
  );
}
export default Header_buttons;
