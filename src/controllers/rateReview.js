const httpStatus = require("http-status");
const { rateReviewSchema } = require("../validations/userSchema.validation");
const {
  postDataRateReview,
  updateDataReview,
  deleteRateReviewData,
  listReviewData,
  avgRatingData,
} = require("../services/rateReview.service");

const postRateAndReview = async (req, res) => {
  const _id = req.params.id;
  try {
    const result = await rateReviewSchema.body.validateAsync(req.body);

    // console.log("result ?",result);

    const postData = await postDataRateReview(result, _id);

    // console.log("postData??",postData);
    res.status(httpStatus.OK).json(postData);
  } catch (error) {
    if (error.isJoi == true) {
      res.status(httpStatus.UNPROCESSABLE_ENTITY).json(error.message);
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }
};

const updateReviewData = async (req, res) => {
  //    console.log("fesffsf",req.params);
  try {
    const movieId = req.params.movieId;
    const reviewId = req.params.reviewId;
    //  console.log(movieId,reviewId);
    const result = await rateReviewSchema.body.validateAsync(req.body);

    const updateDetailsMovie = await updateDataReview(
      result,
      movieId,
      reviewId
    );
    res.status(httpStatus.OK).json(updateDetailsMovie);
  } catch (error) {
    if (error.isJoi == true) {
      res.status(httpStatus.UNPROCESSABLE_ENTITY).json(error.message);
    } else if (error.statusCode === 404) {
      res.status(httpStatus.OK).json(error.message);
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }
};

const deleteReviewData = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const reviewId = req.params.reviewId;

    const deleteData = await deleteRateReviewData(movieId, reviewId);
    res.status(httpStatus.OK).send();
  } catch (error) {
    if (error.statusCode === 404) {
      res.status(httpStatus.OK).json(error.message);
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }
};

const listAllReview = async (req, res) => {
  //    console.log("fesffsf",req.params);
  try {
    const movieId = req.params.id;
    const listData = await listReviewData(movieId);
    res.status(httpStatus.OK).json(listData);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.message);
  }
};

const averageRating = async(req,res)=>{

  try {
    const movieId = req.params.id;
    // console.log(movieId);
    const avgRate=await avgRatingData(movieId);
    res.status(httpStatus.OK).json({"avgRating":avgRate});
  } catch (error) {
    if (error.statusCode === 204) {
      res.status(httpStatus.NO_CONTENT).json(error.message);
    }
    else{
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }

}

module.exports = {
  postRateAndReview,
  updateReviewData,
  deleteReviewData,
  listAllReview,
  averageRating,
};
