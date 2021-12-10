import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import Styles from '../../styles/video.module.css';

const Play = function Play() {
  const router = useRouter();
  const { id } = router.query;
  const [baseUrl] = useState('https://player.uauflix.online/');
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
      </div>
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
        src={baseUrl + id}
      />
    </div>
  );
};

export default Play;
