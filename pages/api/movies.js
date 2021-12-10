import Request_info from "../../components/Request_info";

export default async function handler(req, res) {
  const library = await require("../../data/ids_movie.json");
  const fs = require("fs");
  const get = async () => {
    let array_infos = [];
    for (let i = 0; i < library.length; i++) {
      let get_fetch = Request_info({ id: library[i], type: "movie" }).then(
        (data) => {
          return data;
        }
      );
      array_infos.push(get_fetch);
    }
    return await Promise.all(array_infos).then((x) => x);
  }
  let result_get = await get();
  fs.writeFileSync(
    "./data/data_movie.json",
    JSON.stringify(result_get.filter((x) => x !== false))
  )
  res.status(200).json(result_get.filter((x) => x !== false));
}
