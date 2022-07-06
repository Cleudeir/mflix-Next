import Filters from '../../components/Filters';
import Pages from '../../components/Pages';

export async function getStaticProps(context) {

  const type = 'movie';
  const crawling = await fetch(`http://localhost:3000/api/crawling`,
  {
    method: "POST",
    body: type
  })
      .then((resp) => resp.json())
      .then((data) => data)
      .catch((error) => error);
  
  const library = await fetch(`http://localhost:3000/api/themoviedb`,
  {
    method: "POST",
    body: JSON.stringify({library:crawling, type})
  })
      .then((resp) => resp.json())
      .then((data) => data)
      .catch((error) => error);

  const { dataGenres } = await Filters({library});
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
