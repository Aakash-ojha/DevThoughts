import mongoose from "mongoose";
import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 8000;

const DB = process.env.MONGO_URI.replace(
  "<db_password>",
  process.env.DB_PASSWORD,
);

mongoose
  .connect(DB)
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log("DB connection successful");
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" ❌ DB connection error:", err);
  });
