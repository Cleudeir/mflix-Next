import { useEffect } from 'react';
import Router from 'next/router';
import Head from 'next/head';

const Home = function Home() {
  useEffect(() => {
    const { pathname } = Router;
    if (pathname === '/') {
      Router.push('/movie');
    }
    localStorage.clear();
  });
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
    </div>
  );
};
export default Home;
