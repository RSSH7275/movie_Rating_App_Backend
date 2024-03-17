const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { Movies } = require("../models/index");

// what is result?? {
//     title: 'this is title',
//     director: 'this is duhfasf',
//     genre: 'action',
//     releaseYear: 2024-03-15T18:30:00.000Z,
//     description: 'vsejkfbkjsbvkjs'
//   }

const addMovieData = async (body) => {
  // console.log("body is ??",body);
  const { title, director, genre, releaseYear, description } = body;

  const istitleExists = await Movies.findOne({ title: title });

  // console.log("is movie exist??", istitleExists);

  if (istitleExists) {
    throw new ApiError(
      httpStatus.OK,
      "Title name already taken, try giving different names"
    );
  } else {
    const document = await Movies.create(body);
    return document;
  }
};

const updateMovieData = async (body, _id) => {
  const data = await Movies.findByIdAndUpdate(_id, { $set: body });
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "Movie Id not Found");
  } else {
    return data;
  }
};

const deleteMovieData = async (id) => {
  const isMovie = await Movies.findByIdAndDelete({ _id: id });

  // console.log("isMovie??",isMovie);

  if (!isMovie) {
    throw new ApiError(httpStatus.NOT_FOUND, "Movie id Not Found");
  }
  return isMovie;
};

const getMoviesById = async (id) => {
  const getMovie = await Movies.findById({ _id: id });
  //  console.log("get movie ka particular id??",getMovie);
  if (!getMovie) {
    throw new ApiError(httpStatus.NOT_FOUND, "Movie id Not Found");
  }

  return getMovie;
};

const getAllMoviesData = async () => {
  const getAllMovie = await Movies.find();

  return getAllMovie;
};

module.exports = {
  addMovieData,
  updateMovieData,
  deleteMovieData,
  getMoviesById,
  getAllMoviesData,
};
