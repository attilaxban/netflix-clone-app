import express from "express";
import {
  getSimilarTvs,
  getTrendingTv,
  getTvDetails,
  getTvsByCategory,
  getTvTrailers,
  getTvByGenre,
} from "../Controllers/tv.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/trending", verifyToken, getTrendingTv);
router.get("/:id/trailers", verifyToken, getTvTrailers);
router.get("/:id/details", verifyToken, getTvDetails);
router.get("/:id/similar", verifyToken, getSimilarTvs);
router.get("/:category", verifyToken, getTvsByCategory);
router.get("/genre/:genreID", verifyToken, getTvByGenre);

export default router;
