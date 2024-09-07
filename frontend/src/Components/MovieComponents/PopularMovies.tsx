import React, { useEffect, useState, useRef } from 'react';
import './PopularMovies.css'

export const PopularMovies = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [movies, setMovies] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const getPopular = async () => {
    try {
      const response = await fetch('/api/v1/movies/popular', {
        method: 'GET',
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched movies:', data.content);
        setMovies(data.content || []);
      } else {
        console.log('Failed to fetch movies');
      }
    } catch (error) {
      console.log('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    getPopular();
  }, []);


  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -500,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 500,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="main-bg min-h-screen">
      <div className="relative z-40">
      <h1 className="text-1xl font-bold text-white ml-8 mb-4">Popular on Netflix</h1>
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition"
        >
          &#8592;
        </button>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-8 p-8 scrollbar-hide scroll-smooth"
        >
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div
              key={movie.id}
               className="relative flex-shrink-0 w-64 bg-gray-900 rounded-lg transform transition-transform hover:scale-105 duration-300 hover:z-10">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-85 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center p-4 cursor-pointer">
                  <div>
                    <h2 className="text-lg font-bold text-white">{movie.title}</h2>
                    <p className="text-gray-400 text-sm">{movie.overview.slice(0, 100)}...</p>
                  </div>
                </div>
              </div>

            ))
          ) : (
            <p className="text-white">No movies available</p>
          )}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};
export default PopularMovies
