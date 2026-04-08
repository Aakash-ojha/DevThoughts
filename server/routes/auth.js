import express from "express";
import {
  getMe,
  login,
  logout,
  protect,
  register,
  signInToken,
} from "../controllers/authController.js";
import passport from "passport";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getMe", protect, getMe);

// ===========google route==========
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  function (req, res) {
    const token = signInToken(req.user);

    res.cookie("jwt", token, {
      httpOnly: true,
      path: "/",
      secure: false,
      sameSite: "lax",
      expires: new Date(
        Date.now() +
          parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 1000,
      ),
    });
    // Successful authentication, redirect home.
    res.redirect("http://localhost:5173");
  },
);

export default router;
