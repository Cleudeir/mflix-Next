import Filters from '../../components/Filters';
import Pages from '../../components/Pages';

export async function getStaticProps(context) {
  // Call an external API endpoint to get posts.
  console.log(context);
  // You can use any data fetching library
  const type = 'movie';
  const { dataGenres } = await Filters({ type });
  const data = dataGenres;
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      data,
      type,
    },
    revalidate: 24 * 60 * 60,
  };
}
const Movies = function Movies({ data, type }) {
  return (
    <Pages type={type} data={data} />
  );
};

export default Movies;
