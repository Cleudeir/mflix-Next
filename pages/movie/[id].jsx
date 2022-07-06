import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import Styles from '../../styles/video.module.css';

export default function PlayMovie() {
  const router = useRouter();
  const { id } = router.query;
  const [baseUrl] = useState(
    [
      'https://player.uauflix.online/',
    ],
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (id) {
      localStorage.setItem('lastView_movie', id);
    }
  }, [id]);

  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <Link href="/movie">
          <a href="replace" className="myButton">Voltar</a>
        </Link>
        {/* <select className="myButton" onChange={(e) => { setIndex(e.target.value); }}>
          <option value={0}>
            Server 01
          </option>
          <option value={1}>
            Server 02
          </option>
        </select> */}
      </div>

      <iframe
        className={Styles.iframe}
        autoPlay
        preload="auto"
        sandbox="allow-scripts  allow-same-origin"
        title="Mflix"
        allowFullScreen
        scrolling="no"
        frameBorder="0"
        src={baseUrl[index] + id}
      />
    </div>

  );
}
