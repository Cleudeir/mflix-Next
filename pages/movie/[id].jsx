import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

function start_filme() {
  const id = useRouter().query.id;
  const [base_url] = useState("https://player.uauflix.online/");
  return (
    <iframe
      style={{ width: "100vw", height: "100vh" }}
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
  );
}

export default start_filme;
