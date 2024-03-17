const mongoose = require("mongoose");

const rateReviewDataSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

// userId:Joi.string().required(),
// movieId:Joi.string().required(),
// rate:Joi.number().required(),
// review:Joi.string().required(),

const rateReview = mongoose.model("rateReviewData", rateReviewDataSchema);

module.exports = rateReview;
