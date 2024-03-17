const Joi = require("joi");
const {validPass} = require("./custom.validation");

// checking the request body of the user registered on register page using joi schema
const regisSchema = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().custom(validPass).required(),
  }),
};

// checking the request body of the user logged on login page using joi schema
const logSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().custom(validPass).required(),
  }),
};


// checking the request body of the user of added movie on dashborad page using joi schema

const movieSchema={
  body: Joi.object().keys({
    title :Joi.string().required(), 
    director:Joi.string().required(), 
    genre:Joi.string().required(), 
    releaseYear:Joi.date().required(),  
    description:Joi.string().required(),
  })
}

// checking the request body of the user of rating and reviews

const rateReviewSchema={
  body:Joi.object().keys({
    userId:Joi.string().required(),
    movieId:Joi.string().required(),
    rate:Joi.number().required(),
    review:Joi.string().required(),
  })
}



module.exports = { regisSchema, logSchema,movieSchema,rateReviewSchema};
