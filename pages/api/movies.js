import RequestInfo from '../../components/RequestInfo';

export default async function handler(req, res) {
  const library = await require('../../data/ids_movie.json');

  const fs = require('fs');
  const get = async () => {
    const arrayInfos = [];
    for (let i = 0; i < library.length; i += 1) {
      const getFetch = RequestInfo({ id: library[i], type: 'movie' }).then(
        (data) => data,
      );
      arrayInfos.push(getFetch);
    }
    return Promise.all(arrayInfos).then((x) => x);
  };
  const resultGet = await get();
  fs.writeFileSync(

    './data/data_movie.json',
    JSON.stringify(resultGet.filter((x) => x !== false)),
  );
  res.status(200).json(resultGet.filter((x) => x !== false));
}
