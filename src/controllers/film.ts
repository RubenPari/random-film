import Axios, { AxiosResponse } from "axios";
import { Request, ResponseToolkit } from "hapi";

export const getFilmRandom = async (_req: Request, _res: ResponseToolkit) => {
  console.log("Called getFilmRandom endpoint");

  const movieID = Math.floor(Math.random() * 10000) + 1;
  let response;

  console.log("generate random id: " + movieID);

  const url =
    process.env.BASE_URL +
    "/movie/" +
    movieID +
    "?api_key=" +
    process.env.API_KEY;

  try {
    response = await Axios.get(url);
  } catch (error) {
    return error;
  }

  if (response.status !== 200) {
    return "request doesn't have success response";
  }

  return response.data;
};

export const getFilmRandomGenre = async (
  req: Request,
  _res: ResponseToolkit
) => {
  console.log("called getFilmRandomGenre");

  const genre = req.params.genre;
  let movieID;
  let response;
  let genres;

  do {
    movieID = Math.floor(Math.random() * 10000) + 1;

    console.log("generate random id: " + movieID);

    const url =
      process.env.BASE_URL +
      "/movie/" +
      movieID +
      "?api_key=" +
      process.env.API_KEY;

    try {
      response = await Axios.get(url);
    } catch (error) {
      return error;
    }

    if (response.status !== 200) {
      return "request doesn't have success response";
    }

    genres = response.data.genres;

    console.log("The genres of film are " + genres);

    // repeat the process if the film doesn't have the genre
  } while (genres.find((g: any) => g.name === genre) === undefined);
};

export const getFilmRandomRating = async (
  req: Request,
  _res: ResponseToolkit
) => {
  console.log("Called getFilmRandomRating endpoint");

  console.log("The rating is " + req.params.rating);

  const rating = parseInt(req.params.rating);

  let movieID: number;
  let url: string;
  let response: AxiosResponse;

  do {
    movieID = Math.floor(Math.random() * 10000) + 1;

    url =
      process.env.BASE_URL +
      "/movie/" +
      movieID +
      "?api_key=" +
      process.env.API_KEY;

    try {
      response = await Axios.get(url);
    } catch (error) {
      return error;
    }

    if (response.status != 200) {
      return "request doesn't have success response";
    }

    console.log("The vote got is " + response.data.vote_average);
  } while (parseInt(response.data.vote_average) < rating);

  return response.data;
};
