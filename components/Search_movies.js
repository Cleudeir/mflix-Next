import { library_movies } from "../library/library_movies";
async function Search_movies() {
  const get_infos = async (props) => {
    let array_infos = [];
    for (let i = 0; i < props.length; i++) {
      let get_fetch = fetch(`/api/movie/${props[i].id}`)
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          return data;
        });
      array_infos.push(get_fetch);
    }
    return Promise.all(array_infos).then((x) => x);
  };

  let result = await get_infos(library_movies.reverse().splice(0, 1000));

  return result;
}

export default Search_movies;
