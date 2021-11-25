// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async function handler(req, res) {
  const id = req.query.parameter;
  //busca por ID
  const API_KEY = "5417af578f487448df0d4932bc0cc1a5";
  const API_BASE = "https://api.themoviedb.org/3";

  let search = await fetch(
    `${API_BASE}/movie/${id}?api_key=${API_KEY}&language=pt-BR`
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch(() => null);
  if (search && search.genres && search.poster_path) {
    if (search.backdrop_path) {
      search.backdrop_path =
        "https://image.tmdb.org/t/p/original" + search.backdrop_path;
    } else {
      search.backdrop_path =
        "https://image.tmdb.org/t/p/original" + search.poster_path;
    }

    search.poster_path = "https://image.tmdb.org/t/p/w342" + search.poster_path;

    if (search.genres[0] && search.genres[0].name != "Thriller") {
      search.genres = await search.genres[0].name;
    } else {
      if (search.genres[1] && search.genres[1].name != "Thriller") {
        search.genres = await search.genres[1].name;
      } else {
        if (search.genres[2] && search.genres[2].name != "Thriller") {
          search.genres = await search.genres[2].name;
        } else {
          search.genres = "Suspense";
        }
      }
    }

    const {
      backdrop_path,
      genres,
      original_title,
      overview,
      poster_path,
      runtime,
      title,
      vote_average,
    } = search;

    res.status(200).json({
      backdrop_path,
      genres,
      imdb_id: id,
      original_title,
      overview,
      poster_path,
      runtime,
      title,
      vote_average,
    });
  } else {
    res.status(200).json(false);
  }
}
