// const express=require("express");
const httpStatus = require("http-status");
const { logSchema } = require("../validations/userSchema.validation");
const { getUserData } = require("../services/loginUser.service");
const { jwtTokenGenrate } = require("../services/genToken.service");

const loginUser = async (req, res) => {
  // console.log("efwffref",req);
  try {
    const result = await logSchema.body.validateAsync(req.body);

    const logData = await getUserData(result);

    //   console.log("logData",logData);
    // after genrate tokens here
    const tokenGen = await jwtTokenGenrate(logData);
    // console.log("token",tokenGen);
    const tokenAuthData = {
      logData,
      tokenGen,
    };
    res.status(httpStatus.OK).json(tokenAuthData);
  } catch (error) {
    // console.log("what is err",error)
    if (error.isJoi == true) {
      res.status(httpStatus.UNPROCESSABLE_ENTITY).json(error.message);
    } else if (error.statusCode === 401) {
      res.status(httpStatus.UNAUTHORIZED).json(error.message);
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }
};

module.exports = { loginUser };
