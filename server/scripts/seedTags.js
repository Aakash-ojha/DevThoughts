import mongoose from "mongoose";
import Tag from "../models/TagModel.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve("../.env"),
});

const TAGS_TO_SEED = [
  { name: "JavaScript", slug: "javascript", color: "#f7df1e" },
  { name: "TypeScript", slug: "typescript", color: "#3178c6" },
  { name: "Python", slug: "python", color: "#3776ab" },
  { name: "Rust", slug: "rust", color: "#dea584" },
  { name: "Go", slug: "go", color: "#00add8" },
  { name: "React", slug: "react", color: "#61dafb" },
  { name: "Node.js", slug: "nodejs", color: "#339933" },
  { name: "MongoDB", slug: "mongodb", color: "#47a248" },
  { name: "Next.js", slug: "nextjs", color: "#000000" },
  { name: "Tailwind CSS", slug: "tailwind", color: "#06b6d4" },
];

async function seedData() {
  try {
    const DB = process.env.MONGO_URL.replace(
      "<db_password>",
      process.env.DB_PASSWORD,
    );

    const mongoUrl = DB;
    if (!mongoUrl) {
      throw new Error("MONGODB_URL is not defined in .env file");
    }
    console.log("connecting to mongodb");
    await mongoose.connect(mongoUrl);

    console.log("start seeding");
    await Tag.bulkWrite(
      TAGS_TO_SEED.map((tag) => ({
        updateOne: {
          filter: { slug: tag.slug },
          update: { $setOnInsert: tag },
          upsert: true,
        },
      })),
    );
  } catch (err) {
    console.log(err);
  }
}

seedData();
