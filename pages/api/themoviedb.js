import RequestInfo from '../../components/RequestInfo';

export default async function themoviedb(req, res) {
  const { library, type } = JSON.parse(req.body);
  const get = async () => {
    const arrayInfos = [];
    for (let i = 0; i < library.length; i += 1) {
      const getFetch = RequestInfo({ id: library[i], type }).then(
        (data) => data,
      );
      arrayInfos.push(getFetch);
    }
    return Promise.all(arrayInfos).then((x) => x);
  };
  const pull = await get();
  const result = pull.filter((x) => x !== false);
  res.status(200).json(result);
}
