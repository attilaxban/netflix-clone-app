import express from "express";
import { getSimilarTvs, getTrendingTv, getTvDetails, getTvsByCategory, getTvTrailers, } from '../Controllers/tv.controller.js';
import { verifyToken } from "../config/auth.js";

const router = express.Router();

router.get("/trending", verifyToken, getTrendingTv);
router.get("/:id/trailers", verifyToken, getTvTrailers);
router.get("/:id/details", verifyToken, getTvDetails);
router.get("/:id/similar", verifyToken, getSimilarTvs);
router.get("/category/:category", verifyToken, getTvsByCategory);

export default router;