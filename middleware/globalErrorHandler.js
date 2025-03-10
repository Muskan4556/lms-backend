

const globalErrorHandler = async (error, req, res, next) => {
  const err = new Error();
  err.message = error.message || "Internal Server Error";
  err.statusCode = error.statusCode || 500;
  next(err);
}

export default globalErrorHandler;