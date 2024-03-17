const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const validator = require("validator");

const movieDataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Movies = mongoose.model("moviesData", movieDataSchema);

module.exports = Movies;
