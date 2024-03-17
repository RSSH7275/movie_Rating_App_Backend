const httpStatus = require("http-status");
const { movieSchema } = require("../validations/userSchema.validation");
const {
  addMovieData,
  updateMovieData,
  deleteMovieData,
  getMoviesById,
  getAllMoviesData,
} = require("../services/movieRoute.service");
// const {jwtTokenGenrate}=require("../services/genToken.service");

const addMovie = async (req, res) => {
  //  console.log("what is req body??",req.body);
  try {
    const result = await movieSchema.body.validateAsync(req.body);
    //    console.log("what is result??",result);

    const movieData = await addMovieData(result);

    res.status(httpStatus.OK).json(movieData);
  } catch (error) {
    if (error.isJoi == true) {
      res.status(httpStatus.UNPROCESSABLE_ENTITY).json(error.message);
    } else if (error.statusCode === 200) {
      res.status(httpStatus.OK).json(error.message);
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }
};

const updateMovie = async (req, res) => {
  //  console.log("what is req body??",req.body);
  try {
    const _id = req.params.id;
    const result = await movieSchema.body.validateAsync(req.body);
    const updatemovDat = await updateMovieData(result, _id);
    res.status(httpStatus.OK).json(updatemovDat);
  } catch (error) {
    if (error.statusCode === 404) {
      res.status(httpStatus.NOT_FOUND).json(error.message);
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }
};

const deleteMovie = async (req, res) => {
  try {
    const id = req.params.id;
    const deletemovieDat = await deleteMovieData(id);
    res.status(httpStatus.OK).json(deletemovieDat);
  } catch (error) {
    if (error.statusCode === 404) {
      res.status(httpStatus.NOT_FOUND).json(error.message);
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }
};

const getMovieById = async (req, res) => {
  try {
    const id = req.params.id;
    const getMovieId = await getMoviesById(id);
    res.status(httpStatus.OK).json(getMovieId);
  } catch (error) {
    if (error.statusCode === 404) {
      res.status(httpStatus.NOT_FOUND).json(error.message);
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }
};

const getAllMovies = async (req, res) => {
  try {
    const allMovies = await getAllMoviesData();
    res.status(httpStatus.OK).json(allMovies);
  } catch (error) {
    if (error.statusCode === 404) {
      res.status(httpStatus.NOT_FOUND).json(error.message);
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }
};

module.exports = {
  addMovie,
  updateMovie,
  deleteMovie,
  getMovieById,
  getAllMovies,
};
