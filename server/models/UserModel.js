import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  username: {
    type: String,
    // required: [true, "Please provide a username"],
    // unique: true,
    lowercase: true,
  },

  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
  },
  phoneNo: {
    type: String,
    required: [false, "Please provide your phone number"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [false, "Please confirm your password"],
    minlength: 8,
  },

  // Profile
  profilePicture: {
    type: String,
    default: "default-profile.png",
  },

  bio: {
    type: String,
    default: "",
    maxlength: 500,
  },

  skills: {
    type: [String],
    default: [],
  },

  github: {
    type: String,
    default: "",
  },

  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

export default User;
