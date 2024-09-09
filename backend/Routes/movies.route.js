import express from 'express';

import { getTrendingMovie, getMovieTrailers, getMovieDetails, getSimilarMovies, getMoviesByCategory } from '../Controllers/movies.controller.js';
import { verifyToken } from '../config/tokenGenerator.js';


const router = express.Router();

router.get('/trendings', verifyToken, getTrendingMovie)
router.get('/:id/trailers', verifyToken, getMovieTrailers)
router.get('/:id/details', verifyToken, getMovieDetails)
router.get('/:id/similar', verifyToken, getSimilarMovies)
router.get('/:category', verifyToken, getMoviesByCategory)

export default router;