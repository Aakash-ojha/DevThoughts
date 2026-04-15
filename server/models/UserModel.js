import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
const { Schema } = mongoose;

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
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  phoneNo: {
    type: String,
    required: [false, "Please provide your phone number"],
  },
  password: {
    type: String,
    minlength: 8,
    required: function () {
      return this.authProvider === "local";
    },
    select: false,
  },
  confirmPassword: {
    type: String,
    minlength: 8,
    required: function () {
      return this.authProvider === "local";
    },
    validate: {
      validator: function (el) {
        if (!el) return true;
        return el === this.password;
      },
      message: "Password are not same",
    },
    select: false,
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
  authProvider: {
    type: String,
    enum: ["local", "google", "github"],
    default: "local",
  },
  providerId: {
    type: String,
    default: null,
  },

  passwordChangeAt: Date,
  createdAt: { type: Date, default: Date.now },
});

// ==============Hash the password before saving the user==============
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  const rounds = parseInt(process.env.SALT_ROUNDS, 10) || 12;
  this.password = await bcrypt.hash(this.password, rounds);
  this.confirmPassword = undefined;
  this.passwordChangeAt = Date.now() - 1000;
});

// ============checking the input password is correct or not================
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

//
userSchema.methods.changedPasswordAfter = function (JwtTimestamp) {
  console.log(JwtTimestamp);

  if (this.passwordChangeAt) {
    const changedTimestamp = parseInt(this.passwordChangeAt.getTime() / 1000);
    console.log(changedTimestamp);

    return JwtTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model("User", userSchema);

export default User;
