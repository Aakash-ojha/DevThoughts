import express from "express";
import authRoutes from "./routes/auth.js";
import errorController from "./controllers/errorController.js";
import cors from "cors";

const app = express();

// Allow the frontend to access the API
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());
app.use("/api/auth", authRoutes);

app.use(errorController);

export default app;
