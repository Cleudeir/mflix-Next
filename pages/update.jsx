import { useState, useEffect } from 'react';

function go() {
  const [status, setStatus] = useState('Atualizando....');

  async function update() {
    //---
    await fetch('/api/crawling')
      .then((resp) => resp.json())
      .then((data) => data)
      .catch((error) => error);
    setStatus('crawling, está atualizado');
    //--
    await fetch('/api/movies')
      .then((resp) => resp.json())
      .then((data) => data)
      .catch((error) => error);

    setStatus('movies, está atualizado');
    //--
    await fetch('/api/tvs')
      .then((resp) => resp.json())
      .then((data) => data)
      .catch((error) => error);
    setStatus('tvs, está atualizado');
  }

  useEffect(() => {
    update();
  }, []);
  return (
    <div style={{ backgroundColor: 'while' }}>
      <h1 style={{ color: 'while', fontSize: '50px' }}>{status}</h1>
    </div>
  );
}

export default go;
