import Link from "next/link";
import Styles from "../styles/Home.module.css";
export default function Home() {
  return (
    <div
      className={Styles.container}
      style={{ display: "flex", justifyContent: "space-around" }}
    >
      <Link href="/movie">
        <a
          className="myButton"
          style={{ width: "300px", height: "200px", fontSize: "2em" }}
        >
          Movie
        </a>
      </Link>
      <Link href="/tv">
        <a
          className="myButton"
          style={{ width: "300px", height: "200px", fontSize: "2em" }}
        >
          Tv
        </a>
      </Link>
    </div>
  );
}
