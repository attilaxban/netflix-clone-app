import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authorizationRoutes from "./Routes/auth.route.js";
import movieRoutes from "./Routes/movies.route.js";
import tvRoutes from "./Routes/tv.route.js";
import { verifyToken } from "./config/tokenGenerator.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

dotenv.config();
mongoose.connect(process.env.MONGO_URL);

app.use("/api/v1/users", authorizationRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/tv", tvRoutes);

app.get('/api/v1/users/verify-token', verifyToken, (req, res) => {
  res.status(200).json({ success: true });
});

app.listen(3000, () => {
  console.log("App is running on http://localhost:3000");
});
