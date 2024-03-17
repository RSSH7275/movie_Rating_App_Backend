require("dotenv").config();

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(process.env.DEV_MODE === "development" && { stack: err.stack }),
  };

  if (process.env.DEV_MODE === "development") {
    // console.error(err);
    res.status(statusCode).send(err);
  } else {
    res.status(statusCode).send(response);
  }
};

module.exports = {
  errorHandler,
};
