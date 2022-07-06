import { useRouter } from 'next/router';
import { useState, useEffect, useLayoutEffect } from 'react';
import Link from 'next/link';
import Styles from '../../styles/video.module.css';

export default function PlayTv() {
  const router = useRouter();
  const { id } = router.query;

  const [baseUrl] = useState(['https://player.uauflix.online/tv']);
  const [useId, setId] = useState(false);
  const [useSeasons, setSeasons] = useState(false);
  const [useEp, setEp] = useState(0);
  const [useServer, setIndex] = useState(0);

  useEffect(() => {
    if (id) {     
    const [idImdb, stringSeasons] = id;
    const arraySeasons = stringSeasons.split(",")
    localStorage.setItem('lastView_tv', idImdb);
    setId(idImdb);
    
    const storage = localStorage.getItem(idImdb);
      if (storage) {
        setEp(+storage);
      }
    console.log(arraySeasons)    

    const seasonsNames = [];
    for (let i = 0; i < arraySeasons.length; i += 1) {
      for (let j = 0; j < arraySeasons[i]; j += 1) {
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
        seasonsNames.push({
          name: name1 + name2,
          id: `${i + 1}/${j + 1}`,
        });
      }
    }
    setSeasons(seasonsNames);
    }
    
  }, [id]);


  return (

    <div className={Styles.container}>
      <div className={Styles.header}>
        <Link href="/tv">
          <a href="replace" style={{ width: '75px' }} className="myButton">
            Home
          </a>
        </Link>     
        
        {useSeasons && (
          <select
            className="myButton"
            name="name"
            value={useSeasons[useEp].id}
            onChange={(e) => {
              const filterIndex = useSeasons.findIndex(
                (i) => i.id === e.target.value,
              );
              setEp(filterIndex);
              localStorage.setItem(useId, filterIndex);
            }}
          >
            {useSeasons.map((x, i) => (
              <option Key={x.id + i} value={x.id}>
                {x.name}
              </option>
            ))}
          </select>
        )}
        <button
          type="button"
          className="myButton"
          onClick={() => {
            if (useEp > 0) {
              setEp(useEp - 1);
              localStorage.setItem(useId, useEp - 1);
            }
          }}
        >
          Back
        </button>
        <button
          type="button"
          className="myButton"
          onClick={() => {
            if (useEp < useSeasons.length - 1) {
              setEp(useEp + 1);
              localStorage.setItem(useId, useEp + 1);
            }
          }}
        >
          Next
        </button>
      </div>

      {useId && useSeasons && (
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
          src={`${baseUrl[useServer]}/${useId}/${useSeasons[useEp].id}/dub`}
        />
      )}
    </div>
  );
};
