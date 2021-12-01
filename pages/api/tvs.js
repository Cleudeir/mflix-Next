// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Api_request_info from "../../components/api_request_info";

export default async function handler(req, res) {
  const library = await require(`../../data/ids_tv.json`);
  const fs = require("fs");
  const get = async () => {
    let array_infos = [];
    for (let i = 0; i < library.length; i++) {
      let get_fetch = Api_request_info({ id: library[i], type: "tv" }).then(
        (data) => {
          return data;
        }
      );
      array_infos.push(get_fetch);
    }
    return await Promise.all(array_infos).then((x) => x);
  };
  let result_get = await get();
  fs.writeFileSync(
    `./data/data_tv.json`,
    JSON.stringify(result_get)
  );
  res.status(200).json(result_get);
}