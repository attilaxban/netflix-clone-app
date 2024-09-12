import express from "express";
import { getList, removeItemFromList, searchMovie, searchPerson, searchTv, } from '../Controllers/search.controller.js';
import { verifyToken } from "../config/tokenGenerator.js";

const router = express.Router();

router.get("/person/:query", verifyToken, searchPerson);
router.get("/movie/:query", verifyToken, searchMovie);
router.get("/tv/:query", verifyToken, searchTv);

router.get("/history", verifyToken, getList);

router.delete("/history/:id", verifyToken, removeItemFromList);

export default router;