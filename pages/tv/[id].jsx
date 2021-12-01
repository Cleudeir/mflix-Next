import { useRouter } from "next/router";
import React, { useState } from "react";
import Link from "next/link";
function Start_filme() {
  const router = useRouter();
  const id = router.query.id;
  const [base_url] = useState(
    "https://player.uauflix.online/tv/"
  );
  const [, set_ep] = useState('"/1/1/dub"')
  //const [base_url] = useState("https://play.midiaflixhd.com/");
  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <div style={{ zIndex: "99", position: "fixed", margin: "5px 48%" }}>
        <Link href="/movie">
          <a className="myButton">Voltar</a>
        </Link>
      </div>
      <iframe
        style={{ width: "100%", height: "100vh" }}
        rel="preload"
        autoPlay
        allow="autoplay; encrypted-media; preload"
        preload="auto"
        sandbox="allow-scripts  allow-same-origin"
        title="Mflix"
        allowFullScreen
        scrolling="no"
        frameBorder="0"
        src={base_url + id + ep}
      ></iframe>
    </div>
  );
}
export default Start_filme;
