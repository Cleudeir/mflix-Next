import { useEffect } from 'react';
import Router from 'next/router';

const Home = function Home() {
  useEffect(() => {
    const { pathname } = Router;
    if (pathname === '/') {
      Router.push('/movie');
    }
    localStorage.clear();
  });

  return <div>hello world</div>;
};
export default Home;
