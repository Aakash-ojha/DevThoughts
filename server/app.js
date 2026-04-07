import express from "express";
import authRoutes from "./routes/auth.js";
import errorController from "./controllers/errorController.js";

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);

app.use(errorController);

export default app;
