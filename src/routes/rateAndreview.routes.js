const express = require("express");
const router = express.Router();
const movieRoute = require("../controllers/rateReview");
const passport = require("passport");

// Rate and Review Movie

router.post(
  "/:id/reviews",
  passport.authenticate("jwt", { session: false }),
  movieRoute.postRateAndReview
);

// Update Review

router.put(
  "/:movieId/reviews/:reviewId",
  passport.authenticate("jwt", { session: false }),
  movieRoute.updateReviewData
);

// Delete Review

router.delete(
  "/:movieId/reviews/:reviewId",
  passport.authenticate("jwt", { session: false }),
  movieRoute.deleteReviewData
);

// List Reviews

router.get(
  "/:id/reviews",
  passport.authenticate("jwt", { session: false }),
  movieRoute.listAllReview
);

// Movie Average Rating

router.get(
  "/:id/averageRating",
  passport.authenticate("jwt", { session: false }),
  movieRoute.averageRating
);

module.exports = router;
