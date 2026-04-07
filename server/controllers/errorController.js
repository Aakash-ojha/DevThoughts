import { handleDuplicateFieldsDB } from "../middleware/errorHandler.js";

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.code === 11000) {
    err = handleDuplicateFieldsDB(err);
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
