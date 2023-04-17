import Hapi from "@hapi/hapi";
import Axios, { AxiosResponse } from "axios";

export const getFilmRandom = async (
  _req: Hapi.Request,
  _res: Hapi.ResponseToolkit
) => {
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

export const getFilmRandomGenre = async (req: any, res: any) => {
  return "Hello, world!";
};

export const getFilmRandomRating = async (
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
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
