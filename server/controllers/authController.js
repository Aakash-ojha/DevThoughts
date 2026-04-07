import User from "../models/UserModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

const register = catchAsync(async (req, res) => {
  const { name, username, email, password, confirmPassword } = req.body;

  if (!name || !username || !email || !password || !confirmPassword) {
    return next(new AppError("All fields are required", 400));
  }

  if (password !== confirmPassword) {
    return next(new AppError("Passwords do not match", 400));
  }

  // Here you would typically check if the user already exists and then create a new user in the database

  const newUser = await User.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  // For now, we'll just return a success message

  res
    .status(201)
    .json({ message: "User registered successfully", data: newUser });
});

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Email and password are required", 400));
  }
  // Here you would typically check if the user exists and if the password is correct
  const user = await User.findOne({ email }).select("+password");
  console.log(user);

  if (!user || user.password !== password) {
    return next(new AppError("Invalid email or password", 401));
  }

  // For now, we'll just return a success message

  res.status(200).json({ message: "User logged in successfully" });
};

const logout = (req, res) => {
  res.send("Logout route");
};

const getMe = (req, res) => {
  res.send("Get me route");
};

export { register, login, logout, getMe };
