export const library_movies = async () => {
  const relember = JSON.parse(localStorage.getItem("library_movies"));
  if (relember) {
    return relember;
  } else {
    const res = await fetch("/api/movie/crawling");
    const posts = await res.json();
    localStorage.setItem("library_movies", JSON.stringify(posts));
    return posts;
  }
};
