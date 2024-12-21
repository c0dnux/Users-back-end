const ErrApp = require("./../apiModules/errApp");
const devErr = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};
const prodErr = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error(err);
  }
};
const handCastEr = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new ErrApp(message, 404);
};
const handValEr = (err) => {
  const errors = Object.values(err.errors).map((elem) => elem.message);
  const message = `Invalid input data: ${errors.join(". ")}`;
  return new ErrApp(message, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";
  if (process.env.NODE_ENV === "development") {
    devErr(err, res);
  } else if (process.env.NODE_ENV === "production") {
    // let error = JSON.parse(JSON.stringify(err));
    let error = { ...err };
    if (error.name == "CastError") error = handCastEr(error);
    if (error.name == "ValidationError") error = handValEr(error);

    prodErr(error, res);
  }
};
