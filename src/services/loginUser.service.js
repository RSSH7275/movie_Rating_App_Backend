const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { User } = require("../models/index");

const getUserData = async (body) => {
  const { email, password } = body;

  const getUserByemail = await User.findOne({ email: email });

  if (getUserByemail) {
    const isPasswordValid = await getUserByemail.isValidPasswrd(password);
//    console.log(isPasswordValid);
    if (!isPasswordValid) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Password not Found in dataBase"
      );
    } else {
      return getUserByemail;
    }
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Email not Found in dataBase");
  }
};

module.exports = { getUserData };
