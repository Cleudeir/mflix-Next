import Filters from './Filters';

export default async function GetInfo({ type }) {
  let url = 'http://localhost:3333';
  try {
    await fetch(url);
  } catch (error) {
    url = 'https://mflixbackend.herokuapp.com';
  }
  const responseCrawling = await fetch(
    `${url}/crawling`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ type }),
    },
  );

  const jsonCrawling = await responseCrawling.json();
  const responseLibrary = await fetch(
    `${url}/themoviedb`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ library: jsonCrawling, type }),
    },
  );

  const jsonLibrary = await responseLibrary.json();

  const { dataGenres } = await Filters({ library: jsonLibrary });
  return dataGenres;
}
