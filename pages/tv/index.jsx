import Filters from '../../components/Filters';
import Pages from '../../components/Pages';

export async function getStaticProps(context) {
  const type = 'tv';
  const crawling = await fetch(
    'http://localhost:3333/crawling',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ type }),
    },
  )
    .then((resp) => resp.json())
    .then((data) => data)
    .catch((error) => error);

  const library = await fetch(
    'http://localhost:3333/themoviedb',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ library: crawling, type }),
    },
  )
    .then((resp) => resp.json())
    .then((data) => data)
    .catch((error) => error);
  const { dataGenres } = await Filters({ library });

  return {
    props: {
      dataGenres,
      type,
    },
    revalidate: 7 * 24 * 60 * 60,
  };
}
const Tv = function Tv({ dataGenres, type }) {
  return (
    <Pages type={type} dataGenres={dataGenres} />
  );
};
export default Tv;
