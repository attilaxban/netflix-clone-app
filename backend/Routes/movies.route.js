import express from 'express';

<<<<<<< HEAD
import { getTrendingMovie, getMovieTrailers, getMovieDetails, getSimilarMovies, getMoviesByCategory, getMoviesByGenre } from '../Controllers/movies.controller.js';
=======
import { getTrendingMovie, getMovieTrailers, getMovieDetails, getSimilarMovies, getMoviesByCategory,getMoviesByGenres } from '../Controllers/movies.controller.js';
>>>>>>> frontend
import { verifyToken } from '../config/tokenGenerator.js';


const router = express.Router();

router.get('/trendings', verifyToken, getTrendingMovie)
router.get('/:id/trailers', verifyToken, getMovieTrailers)
router.get('/:id/details', verifyToken, getMovieDetails)
router.get('/:id/similar', verifyToken, getSimilarMovies)
router.get('/:category', verifyToken, getMoviesByCategory)
<<<<<<< HEAD
router.get('/genre/:genreID', verifyToken, getMoviesByGenre)
=======
router.get('/genre/:genreID', verifyToken, getMoviesByGenres)
>>>>>>> frontend

export default router;