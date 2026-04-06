import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 7777;

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb connected sucessfully");
  } catch (err) {
    console.console.error("Database connection failed", err.message);
    process.exit(1);
  }
};

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
    // console.log("Environment: " + process.env.NODE_ENV);
  });
});
