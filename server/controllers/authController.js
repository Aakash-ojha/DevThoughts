import User from "../models/UserModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";

// ============== Sign In Token ========
export const signInToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// ======================= Create a Jwt token ============================
const createSendToken = (user, statusCode, message, res) => {
  const token = signInToken(user);

  res.cookie("jwt", token, {
    httpOnly: true,
    path: "/",
    secure: false,
    sameSite: "lax",
    expires: new Date(
      Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 1000,
    ),
  });
  // we can also make options into sepearte varaiable

  res
    .status(statusCode)
    .json({ status: "success", token, message, data: { user } });
};

// ======================== Protect Middleware ============================
const protect = catchAsync(async (req, res, next) => {
  // console.log(req.cookies);
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) return next(new AppError("Please Logiin Again", 401));

  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const currentUser = await User.findById(decode.id);

  if (!currentUser) {
    return next(
      // new AppError("The user belonging to this token no longer exists", 401),
      new AppError("Your session is expires. Please Login again!", 401),
    );
  }

  if (currentUser.changedPasswordAfter(decode.iat)) {
    return next(
      new AppError(
        "User recently change the password m, Please log in again",
        401,
      ),
    );
  }

  req.user = currentUser;
  next();
});

// ===================== Register ============================
const register = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return next(new AppError("All fields are required", 400));
  }
  if (password !== confirmPassword) {
    return next(new AppError("Passwords do not match", 400));
  }
  // Here you would typically check if the user already exists and then create a new user in the database
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });
  createSendToken(newUser, 201, "User registered successfully", res);
});

// ====================== Login ============================
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Email and password are required", 400));
  }
  // Here you would typically check if the user exists and if the password is correct
  const user = await User.findOne({ email }).select("+password");
  console.log(user);

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  createSendToken(user, 200, "User logged in successfully", res);
});

// ====================== Logout ============================
const logout = (req, res) => {
  res.send("Logout route");
};

// ====================== Get user if login ============================
const getMe = (req, res) => {
  const user = req.user;

  res.status(200).json({ status: "success", data: { user } });
};

// ====================== exports ============================
export { register, login, logout, getMe, protect };
