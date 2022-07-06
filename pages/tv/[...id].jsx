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
  const [useEp, setEp] = useState(false);
  const [useServer, setIndex] = useState(0);

  useEffect(() => {
    if (id) {
      const [stringSeasons, idImdb, seasonLink, epLink] = id;
      if (!seasonLink || !epLink) {
        const urlRef = document.location.href.split('/');
        document.location.href = `${urlRef.slice(0, 6).join('/')}/1/1`;
      }

      const arraySeasons = stringSeasons.split(',');
      localStorage.setItem('lastView_tv', idImdb);
      setId(idImdb);

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

      if (seasonLink && epLink) {
        const epsodeValue = `${seasonLink}/${epLink}`;
        const filterIndex = seasonsNames.findIndex(
          (i) => i.id === epsodeValue,
        );
        setEp(filterIndex);
        localStorage.setItem(useId, filterIndex);
      } else {
        const storage = localStorage.getItem(idImdb);
        if (storage) {
          setEp(+storage);
        }
      }
    }
  }, [id]);

  return (

    <div className={Styles.container}>
      {useSeasons && (
        <div className={Styles.header}>
          <Link href="/tv">
            <a href="replace" style={{ width: '75px' }} className="myButton">
              Home
            </a>
          </Link>

          <select
            className="myButton"
            name="name"
            value={useSeasons[useEp].id}
            onChange={(e) => {
              const urlRef = document.location.href.split('/');
              document.location.href = `${urlRef.slice(0, 6).join('/')}/${e.target.value}`;
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

          <button
            type="button"
            className="myButton"
            onClick={() => {
              if (useEp > 0) {
                const urlRef = document.location.href.split('/');
                document.location.href = `${urlRef.slice(0, 6).join('/')}/${useSeasons[useEp - 1].id}`;
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
                const urlRef = document.location.href.split('/');
                document.location.href = `${urlRef.slice(0, 6).join('/')}/${useSeasons[useEp + 1].id}`;
                setEp(useEp + 1);
                localStorage.setItem(useId, useEp + 1);
              }
            }}
          >
            Next
          </button>
        </div>
      ) }
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
}
