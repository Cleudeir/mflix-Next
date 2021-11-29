import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Link from 'next/link'
function Start_filme() {
  const router = useRouter();
  const id = router.query.id;
  const [base_url, set_base_url] = useState("https://player.uauflix.online/");
  //const [base_url] = useState("https://play.midiaflixhd.com/");
  return (
    <div>
      <div style={{zIndex:'10'}}>
      <button style={{zIndex:'10'}}
        onClick={() => {
          set_base_url("https://player.uauflix.online/");
        }}
      >
        server01
      </button>
      <button style={{zIndex:'10'}}
        onClick={() => {
          set_base_url("https://play.midiaflixhd.com/");
        }}
      >
        server02
      </button>
      <Link href="/movie">
        <a>
          <button>
            Voltar
          </button>
        </a>
      </Link>
      </div>
     
      <iframe
        style={{ width: "100vw", height: "100vh"}}
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

export default Start_filme;
