/* eslint-disable global-require */
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Styles from '../../styles/video.module.css';

const Play = function Play() {
  const router = useRouter();
  const routerQuery = router.query;
  //
  const library = require('../../data/data_tv.json');
  //---
  const [baseUrl] = useState('https://player.uauflix.online/tv');
  //---
  const [id, setId] = useState(false);
  const [seasons, setSeasons] = useState(false);
  const [ep, setEp] = useState(0);

  useEffect(() => {
    if (routerQuery.id) {
      localStorage.setItem('lastView_tv', id);
      setId(routerQuery.id);
      const storage = localStorage.getItem(id);
      if (storage) {
        setEp(+storage);
      }
    }
    if (id) {
      const info = library.filter((x) => x.imdb_id === id)[0];
      const arraySeasons = [];
      for (let i = 0; i < info.seasons.length; i += 1) {
        for (let j = 0; j < info.seasons[i]; j += 1) {
          let name1;
          let name2;
          if (i < 9) {
            name1 = `S0${i + 1}`;
          } else {
            name1 = `S${i + 1}`;
          }
          if (j < 9) {
            name2 = ` - EP0${j + 1}`;
          } else {
            name2 = ` - EP${j + 1}`;
          }
          arraySeasons.push({
            name: name1 + name2,
            id: `/${i + 1}/${j + 1}`,
          });
        }
      }

      setSeasons(arraySeasons);
    }
  }, [routerQuery, id]);
  // const [base_url] = useState("https://play.midiaflixhd.com/");
  return (

    <div className={Styles.container}>
      <div className={Styles.header}>
        <Link href="/tv">
          <a style={{ width: '75px' }} className="myButton">
            Home
          </a>
        </Link>
        {seasons && (
          <select
            className="myButton"
            name="name"
            value={seasons[ep].id}
            onChange={(e) => {
              const filterIndex = seasons.findIndex(
                (i) => i.id === e.target.value,
              );
              setEp(filterIndex);
              localStorage.setItem(id, filterIndex);
            }}
          >
            {seasons.map((x, i) => (
              <option Key={i} value={x.id}>
                {x.name}
              </option>
            ))}
          </select>
        )}
        <button
          type="button"
          className="myButton"
          onClick={() => {
            if (ep > 0) {
              setEp(ep - 1);
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
              setEp(ep + 1);
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
          autoPlay
          allow="autoplay; encrypted-media;"
          preload="auto"
          sandbox="allow-scripts  allow-same-origin"
          title="Mflix"
          allowFullScreen
          scrolling="no"
          frameBorder="0"
          src={`${baseUrl}/${id}/${seasons[ep].id}/dub`}
        />
      )}
    </div>
  );
};
export default Play;
