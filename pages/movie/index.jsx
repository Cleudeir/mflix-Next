import Filters from '../../modules/Filters';
import Pages from '../../components/Pages';

export async function getStaticProps(context) {
  const type = 'movie';
  console.log(`${process.env.URL}/crawling`);
  const crawling = await fetch(
    'https://mflixbackend.herokuapp.com/crawling',
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
    'https://mflixbackend.herokuapp.com/themoviedb',
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
const Movies = function Movies({ dataGenres, type }) {
  return (
    <Pages type={type} dataGenres={dataGenres} />
  );
};

export default Movies;
