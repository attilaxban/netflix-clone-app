import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/NavBar/NavBar';
import FilmList from '../../Components/List/List';
import { movieGenres } from '../../genres';

export const Movies = () => {
  const [action, setAction] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [horror, setHorror] = useState([]);
  const [crime, setCrime] = useState([]);
  const [family, setFamily] = useState([]);
  const [drama, setDrama] = useState([]);
  const [scifi, setScifi] = useState([]);
  const [fantasy, setFantasy] = useState([]);


  const fetchMovies = async (endpoint, setter) => {
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
    fetchMovies(`/api/v1/movies/genre/${movieGenres.action}`, setAction);
    fetchMovies(`/api/v1/movies/genre/${movieGenres.comedy}`, setComedy);
    fetchMovies(`/api/v1/movies/genre/${movieGenres.horror}`, setHorror);
    fetchMovies(`/api/v1/movies/genre/${movieGenres.crime}`, setCrime);
    fetchMovies(`/api/v1/movies/genre/${movieGenres.family}`, setFamily);
    fetchMovies(`/api/v1/movies/genre/${movieGenres.drama}`, setDrama);
    fetchMovies(`/api/v1/movies/genre/${movieGenres.scifi}`, setScifi);
    fetchMovies(`/api/v1/movies/genre/${movieGenres.fantasy}`, setFantasy);


  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen main-bg">
        <FilmList title="Action" films={action} type={'movies'} />
        <FilmList title="Comedy" films={comedy} type={'movies'} />
        <FilmList title="Horror" films={horror} type={'movies'} />
        <FilmList title="Crime" films={crime} type={'movies'} />
        <FilmList title="Family" films={family} type={'movies'} />
        <FilmList title="Drama" films={drama} type={'movies'} />
        <FilmList title="Sci-Fi" films={scifi} type={'movies'} />
        <FilmList title="Fantasy" films={fantasy} type={'movies'} />
      </div>
    </div>

  );
};

export default Movies;
