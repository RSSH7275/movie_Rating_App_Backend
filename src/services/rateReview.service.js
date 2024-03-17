const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { rateReview } = require("../models/index");

const postDataRateReview = async (body, id) => {
  // console.log(body,id);
  //    const {rateReview,userId,movieId,rate,review}=body
  const userReview = await rateReview.create(body);
  return userReview;
};

// findData {
//     _id: new ObjectId('65f5efa1fd1d76a29adf55ec'),
//     userId: '65f49e4d44f9b4eb86b0d499',
//     movieId: '65f5481dbac98e6ebe6b0bc6',
//     rate: 4,
//     review: 'this is nice movie',
//     __v: 0
//   }
const updateDataReview = async (body, movieId, reviewId) => {
  // console.log("main data",body);

  const findData = await rateReview.findById({ _id: reviewId });

  // console.log("findData",findData);

  // const {_id,userId,movieId,rate,review} = findData;
  // console.log("hello");
  if (
    findData.userId == body.userId &&
    findData.movieId == movieId &&
    findData._id == reviewId
  ) {
    const updateData = await rateReview.findByIdAndUpdate(reviewId, {
      $set: body,
    });
    // console.log("updated data", updateData);
    return updateData;
  } else {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "reviewID || userID || movieID not Found"
    );
  }
};

const deleteRateReviewData = async (movieId, reviewId) => {
  const findData = await rateReview.findById({ _id: reviewId });

  if (findData.movieId == movieId && findData._id == reviewId) {
    const deletedData = await rateReview.findByIdAndDelete(reviewId);
    return deletedData;
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, "reviewID || movieID not Found");
  }
};

const listReviewData = async (movieId) => {
  const listData = await rateReview.find({ movieId: movieId });
  // console.log("what is list data??",listData);
  return listData;
};

const avgRatingData = async (movieId) => {
  // console.log(movieId);
  const rateData=await rateReview.find({ movieId: movieId });
  // console.log("snfkjsd",rateData);
  let avgSum=0;
  if(rateData.length>0){
    for (let i = 0; i < rateData.length; i++) {
      avgSum += (rateData[i].rate/rateData.length); 
    }
    let RatenumAvg=avgSum.toFixed(2);
    let avgNumRate=parseFloat(RatenumAvg);
    return avgNumRate;
  }else{
    throw new ApiError(httpStatus.NO_CONTENT, "No Reviews Found");
  }
};

module.exports = {
  postDataRateReview,
  updateDataReview,
  deleteRateReviewData,
  listReviewData,
  avgRatingData,
};
