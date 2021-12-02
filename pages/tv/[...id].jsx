import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Link from "next/link";
function Play() {
  const router = useRouter();
  const [base_url] = useState("https://player.uauflix.online/tv/");
  const [id, set_id] = useState("");
  const [ep, set_ep] = useState("");

  useEffect(() => {
    const router_query = router.query;
    console.log('router_query:',router_query);
    const router_id = router_query.id[0];
    set_id(router_id);
    const router_ep =
      "/" +
      router_query.id[1] +
      "/" +
      router_query.id[2] +
      "/" +
      router_query.id[3];
    set_ep(router_ep);
    console.log(router_id, router_ep);
  }, [router]);

  //const [base_url] = useState("https://play.midiaflixhd.com/");
  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <div style={{ zIndex: "99", position: "fixed", width: "75px" }}>
        <Link href="/tv">
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
export default Play;
