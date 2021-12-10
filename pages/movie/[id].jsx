import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import Styles from "../../styles/video.module.css"
function Play() {
  const router = useRouter();
  const id = router.query.id;
  const [base_url] = useState("https://player.uauflix.online/");
  useEffect(() => {

    if (id) {
      localStorage.setItem("lastView_movie", id);
    }
  }, [id]);
  return (
    <div className={Styles.container}>
      <div  className={Styles.header}>
        <Link href="/movie">
          <a className="myButton">Voltar</a>
        </Link>
      </div>
      <iframe

      className={Styles.iframe}
        rel="preload"
        autoPlay
        allow="autoplay; encrypted-media;"
        preload="auto"
        sandbox="allow-scripts  allow-same-origin"
        title="Mflix"
        allowFullScreen
        scrolling="no"
        frameBorder="0"
        src={base_url + id}
      ></iframe>
    </div>
  );
}

export default Play;
