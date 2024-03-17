const express = require("express");
const router = express.Router();

// registering a new user
const regisUser = require("./registerUser.routes");
router.use("/users", regisUser);

// logging in for a existing user
const loginUser = require("./loginUser.routes");
router.use("/users", loginUser);

// movies routes

const movieRoute = require("./userMovie.routes");
router.use("/movies", movieRoute);

// rate and reviews routes

const rateReview=require("./rateAndreview.routes");
router.use("/movies",rateReview);


module.exports = router;
