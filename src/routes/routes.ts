import { getFilmRandom, getFilmRandomGenre, getFilmRandomRating } from "../controllers/film";

export const routes = [
  {
    method: "GET",
    path: "/film/random",
    handler: getFilmRandom
  },
  {
    method: "GET",
    path: "/film/random/genre",
    handler: getFilmRandomGenre
  },
  {
    method: "GET",
    path: "/film/random/rating",
    handler: getFilmRandomRating
  }
];
