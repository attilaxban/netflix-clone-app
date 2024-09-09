import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/NavBar/NavBar';
import FilmList from '../../Components/List/List';

export const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  const [popularTV, setPopularTV] = useState([]);
  const [onTheAirTV, setOnTheAirTV] = useState([]);
  const [topRatedTV, setTopRatedTV] = useState([]);

  const getMedia = async (endpoint, setter) => {
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setter(data.content || []);

        
      } else {
        console.error('Failed to fetch movies');
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    getMedia('/api/v1/movies/popular', setPopularMovies);
    getMedia('/api/v1/movies/upcoming', setUpcomingMovies);
    getMedia('/api/v1/movies/top_rated', setTopRatedMovies);

    getMedia('/api/v1/tv/popular', setPopularTV);
    getMedia('/api/v1/tv/on_the_air', setOnTheAirTV);
    getMedia('/api/v1/tv/top_rated', setTopRatedTV);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen main-bg">
        <FilmList title="Popular movies on Netflix" films={popularMovies} type={'movies'} />
        <FilmList title="Upcoming movies" films={upcomingMovies} type={'movies'} />
        <FilmList title="Top Rated Movies" films={topRatedMovies} type={'movies'} />

        <FilmList title="Popular TV's on Netflix" films={popularTV} type={'tv'} />
        <FilmList title="On The Air TV's" films={onTheAirTV} type={'tv'} />
        <FilmList title="Top Rated TV's" films={topRatedTV} type={'tv'} />
      </div>
    </div>

  );
};

export default Home;
