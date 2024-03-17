const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");
const { User } = require("../models/index");

const newUser = async (result) => {
    // console.log("final res",result);
    const { password, email } = result;
  
    const isEmailValid = await User.isEmailExist(email);
  
    const hashPwd = async (password) => {
      const hashing = await bcrypt.hash(password, 10);
      return hashing;
    };
  
    if (!isEmailValid) {
      // will create a new User
      const hashedPassword = await hashPwd(password);
      // console.log("ispasshash",hashedPassword);
      const document = await User.create({ ...result, password: hashedPassword });
      return document;
    } else {
      // or will throw an error
  
      throw new ApiError(httpStatus.OK, "Email already taken");
    }
  };
  
  module.exports = { newUser };



