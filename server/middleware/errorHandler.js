import AppError from "../utils/appError.js";

const handleDuplicateFieldsDB = (err) => {
  // const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  // const value = Object.values(err.keyValue)[0]; this is same as above

  const field = Object.keys(err.keyValue)[0];

  let message = `This ${field} already exists. Please use another value!`;

  if (field === "email") {
    message = "This email already exists. Please use another email!";
  }

  return new AppError(message, 400);
};

export { handleDuplicateFieldsDB };
