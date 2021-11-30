import React, { useEffect } from "react";
import Router from "next/router";
export default function Home() {
  useEffect(() => {
    fetch(`/api/crawling`)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        return data;
      });
    const { pathname } = Router;
    if (pathname == "/") {
      Router.push("/movie");
    }
  });
  return <div></div>;
}