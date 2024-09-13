import express from "express";
import {
  getTrendingMovie,
  getMovieTrailers,
  getMovieDetails,
  getSimilarMovies,
  getMoviesByCategory,
  getMoviesByGenres,
} from "../Controllers/movies.controller.js";

import { verifyToken } from "../config/tokenGenerator.js";

const router = express.Router();

router.get("/trendings", verifyToken, getTrendingMovie);
router.get("/:id/trailers", verifyToken, getMovieTrailers);
router.get("/:id/details", verifyToken, getMovieDetails);
router.get("/:id/similar", verifyToken, getSimilarMovies);
router.get("/:category", verifyToken, getMoviesByCategory);
router.get("/genre/:genreID", verifyToken, getMoviesByGenres);

export default router;
