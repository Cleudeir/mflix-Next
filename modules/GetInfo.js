import Filters from './Filters';

export default async function GetInfo({ type }) {
  let url = 'http://localhost:3333';
  try {
    await fetch(url);
  } catch (error) {
    url = 'https://mflixbackend.herokuapp.com';
  }

  const baseUrl = 'https://redecanais.to';
  const range = 5;

  const responseLibrary = await fetch(
    `${url}/list`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ baseUrl, type, range }),
    },
  );

  const jsonLibrary = await responseLibrary.json();

  const { dataGenres } = await Filters({ library: jsonLibrary });
  return dataGenres;
}
