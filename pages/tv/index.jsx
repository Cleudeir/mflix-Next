import Pages from '../../components/Pages';
import GetInfo from '../../modules/GetInfo';

export async function getStaticProps(context) {
  const type = 'tv';
  const dataGenres = await GetInfo({ type });
  return {
    props: {
      dataGenres,
      type,
    },
    revalidate: 3 * 24 * 60 * 60,
  };
}
const Tv = function Tv({ dataGenres, type }) {
  return (
    <Pages type={type} dataGenres={dataGenres} />
  );
};
export default Tv;
