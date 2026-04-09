import mongoose from "mongoose";
import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 7777;

const DB = process.env.MONGO_URI.replace(
  "<db_password>",
  process.env.DB_PASSWORD,
);

mongoose.connect(DB).then(() => {
  app.listen(PORT, () => {
    console.log(" DB connection sucessful");
    console.log("Server running on port " + PORT);
    // console.log("Environment: " + process.env.NODE_ENV);
  });
});
