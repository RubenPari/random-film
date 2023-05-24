import Axios, { AxiosResponse } from "axios";
import { Request, ResponseToolkit } from "hapi";

async function getFilmRandom(_req: Request, _res: ResponseToolkit) {
  console.log("Called getFilmRandom endpoint");

  const movieID = Math.floor(Math.random() * 10000) + 1;
  let response;

  console.log("generate random id: " + movieID);

  const url = (process.env.BASE_URL as string) + movieID;

  const headers = {
    Authorization: "Bearer " + process.env.ACCESS_TOKEN,
  };

  try {
    response = await Axios.get(url, { headers });
  } catch (error) {
    return {
      status: "error",
      message: "unable to get film, please try again",
    };
  }

  if (response.status !== 200) {
    return "request doesn't have success response";
  }

  return response.data;
}

async function getFilmRandomGenre(req: Request, _res: ResponseToolkit) {
  console.log("called getFilmRandomGenre");

  const genre = req.params.genre;
  let movieID;
  let response;
  let genres;
  const headers = {
    Authorization: "Bearer " + process.env.ACCESS_TOKEN,
  };

  do {
    movieID = Math.floor(Math.random() * 10000) + 1;

    console.log("generate random id: " + movieID);

    const url = (process.env.BASE_URL as string) + movieID;

    try {
      response = await Axios.get(url, { headers });
    } catch (error) {
      return {
        status: "error",
        message: "unable to get film, please try again",
      };
    }

    if (response.status !== 200) {
      return "request doesn't have success response";
    }

    genres = response.data.genres;

    console.log("The genres of film are " + genres);

    // repeat the process if the film doesn't have the genre
  } while (genres.find((g: any) => g.name === genre) === undefined);
}

async function getFilmRandomRating(req: Request, _res: ResponseToolkit) {
  console.log("Called getFilmRandomRating endpoint");

  console.log("The rating is " + req.params.rating);

  const rating = parseInt(req.params.rating);

  let movieID: number;
  let url: string;
  let response: AxiosResponse;
  const headers = {
    Authorization: "Bearer " + process.env.ACCESS_TOKEN,
  };

  do {
    movieID = Math.floor(Math.random() * 10000) + 1;

    url = (process.env.BASE_URL as string) + movieID;

    try {
      response = await Axios.get(url, { headers });
    } catch (error) {
      return {
        status: "error",
        message: "unable to get film, please try again",
      };
    }

    if (response.status != 200) {
      return "request doesn't have success response";
    }

    console.log("The vote got is " + response.data.vote_average);
  } while (parseInt(response.data.vote_average) < rating);

  return response.data;
}

export { getFilmRandom, getFilmRandomGenre, getFilmRandomRating };
