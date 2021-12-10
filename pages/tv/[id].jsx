import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Styles from "../../styles/video.module.css"

function Play() {
  const router = useRouter();
  const router_query = router.query;
  //
  const library = require(`../../data/data_tv.json`);
  //---
  const [base_url] = useState("https://player.uauflix.online/tv");
  //---
  const [id, set_id] = useState(false);
  const [seasons, set_seasons] = useState(false);
  const [ep, set_ep] = useState(0);

  useEffect(() => {
    if (router_query.id) {
      console.log(router_query.id);
      localStorage.setItem("lastView_tv", id);
      set_id(router_query.id);
      let storage = localStorage.getItem(id);
      if (storage) {
        set_ep(+storage);
      }
    }
    if (id) {
      const info = library.filter((x) => x.imdb_id === id)[0];
      console.log(info);
      const array_seasons = [];
      for (let i = 0; i < info.seasons.length; i++) {
        for (let j = 0; j < info.seasons[i]; j++) {

          let name1;
          let name2;
          if(i<9){
            name1 = "S0" + (i + 1) 
          }else{
            name1 = "S" + (i + 1) 
          }
          if(j<9){
            name2 = " - EP0" + (j + 1)
          }else{
            name2 = " - EP" + (j + 1)
          }
          array_seasons.push({
            name: name1+name2,
            id: "/" + (i + 1) + "/" + (j + 1),
          });
        }
      }

      set_seasons(array_seasons);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router_query, id]);
  //const [base_url] = useState("https://play.midiaflixhd.com/");
  console.log(seasons);
  return (

    <div className={Styles.container}>
       <div  className={Styles.header}>
        <Link href="/tv">
          <a style={{ width: "75px" }} className="myButton">
            Home
          </a>
        </Link>
        {seasons && (
          <select
            className="myButton"
            name="name"
            value={seasons[ep].id}
            onChange={(e) => {
              let filter_index = seasons.findIndex(
                (i) => i.id == e.target.value
              );
              set_ep(filter_index);
              localStorage.setItem(id, filter_index);
            }}
          >
            {seasons.map((x, i) => {
              return (
                <option key={i} value={x.id}>
                  {x.name}
                </option>
              );
            })}
          </select>
        )}
        <button
          type="button"
          className="myButton"
          onClick={() => {
            if (ep > 0) {
              set_ep(ep - 1);
              localStorage.setItem(id, ep - 1);
            }
          }}
        >
          Back
        </button>
        <button
          type="button"
          className="myButton"
          onClick={() => {
            if (ep < seasons.length - 1) {
              set_ep(ep + 1);
              localStorage.setItem(id, ep + 1);
            }
          }}
        >
          Next
        </button>
      </div>
      {id && seasons && (
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
          src={base_url + "/" + id + "/" + seasons[ep].id + "/dub"}
        ></iframe>
      )}
    </div>
  );
}
export default Play;
