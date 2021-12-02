import { useRouter } from "next/router";
import React, { useState } from "react";
import Link from "next/link";
function Play() {
  const router = useRouter();
  const id = router.query.id;
  const [base_url] = useState("https://player.uauflix.online/");
  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <div style={{ zIndex: "99", position: "fixed", width:'75px'}}>
        <Link href="/movie">
          <a className="myButton">Voltar</a>
        </Link>
      </div>
      <iframe
        style={{ width: "100%", height: "100vh", overflow: "hidden" }}
        rel="preload"
        autoPlay
        allow="autoplay; encrypted-media; preload"
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
