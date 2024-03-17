const express = require("express");
const router = express.Router();
const movieRoute = require("../controllers/movieRoute");
const passport = require("passport");

// Add Movie a new movie:

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  movieRoute.addMovie
);

// Update Movie an existing movie:

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  movieRoute.updateMovie
);

// Delete Movie by /:id :

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  movieRoute.deleteMovie
);

// Get Movie of Specific movie:

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  movieRoute.getMovieById
);

// Get List Of All Movies :

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  movieRoute.getAllMovies
);

module.exports = router;
