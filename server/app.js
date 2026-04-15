import express from "express";
import authRoutes from "./routes/auth.js";
import tagsRoute from "./routes/tagRoute.js";
import postRoute from "./routes/postRoute.js";
import errorController from "./controllers/errorController.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "./models/UserModel.js";
import userRoute from "./routes/userRouter.js";
import commentRoute from "./routes/commentRoute.js";

const app = express();
app.use(passport.initialize());

// Allow the frontend to access the API
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/tags", tagsRoute);
app.use("/api/post", postRoute);
app.use("/api/user", userRoute);
app.use("/api/comment", commentRoute);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log("--- GOOGLE PROFILE DATA ---");
      console.log(JSON.stringify(profile, null, 2));

      try {
        let user = await User.findOne({ providerId: profile.id });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value,
            providerId: profile.id,
            authProvider: "google",
          });
        }
        return cb(null, user);
      } catch (err) {
        return cb(err, null);
      }
    },
  ),
);

app.use(errorController);

export default app;
