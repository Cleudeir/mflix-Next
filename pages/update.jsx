import React, { useState, useEffect } from "react";

function go() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [status, setStatus] = useState("Atualizando....");

  async function update() {
    //---
    let a = await fetch("/api/crawling")
      .then((resp) => resp.json())
      .then((data) => data)
      .catch((error) => error);
    console.log("crawling", a);
    setStatus("crawling, está atualizado");
    //--
    let b = await fetch("/api/movies")
      .then((resp) => resp.json())
      .then((data) => data)
      .catch((error) => error);
    console.log("movies", b);
    setStatus("movies, está atualizado");
    //--
    let c = await fetch("/api/tvs")
      .then((resp) => resp.json())
      .then((data) => data)
      .catch((error) => error);
    console.log("tvs", c);
    setStatus("tvs, está atualizado, Acabou, está atualizado");
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    update();
  }, []);
  return (
    <div>
      <h1 style={{ color: "while", fontSize: "50px" }}>{status}</h1>
    </div>
  );
}

export default go;
