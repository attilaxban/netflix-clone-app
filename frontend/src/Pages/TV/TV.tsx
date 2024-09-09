import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/NavBar/NavBar';
import FilmList from '../../Components/List/List';
import { movieGenres, tvGenres } from '../../genres';

export const TV = () => {
  const [action, setAction] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [animation, setanimation] = useState([]);
  const [crime, setCrime] = useState([]);
  const [family, setFamily] = useState([]);
  const [drama, setDrama] = useState([]);
  const [scifi, setScifi] = useState([]);
  const [kids, setKids] = useState([]);


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
    fetchMovies(`/api/v1/tv/genre/${tvGenres.actionAndAdventure}`, setAction);
    fetchMovies(`/api/v1/tv/genre/${tvGenres.comedy}`, setComedy);
    fetchMovies(`/api/v1/tv/genre/${tvGenres.animation}`, setanimation);
    fetchMovies(`/api/v1/tv/genre/${tvGenres.crime}`, setCrime);
    fetchMovies(`/api/v1/tv/genre/${tvGenres.family}`, setFamily);
    fetchMovies(`/api/v1/tv/genre/${tvGenres.drama}`, setDrama);
    fetchMovies(`/api/v1/tv/genre/${tvGenres.scifiFantasy}`, setScifi);
    fetchMovies(`/api/v1/tv/genre/${tvGenres.kids}`, setKids);


  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen main-bg">
        <FilmList title="Action" films={action} type={'movies'} />
        <FilmList title="Comedy" films={comedy} type={'movies'} />
        <FilmList title="Animation" films={animation} type={'movies'} />
        <FilmList title="Crime" films={crime} type={'movies'} />
        <FilmList title="Family" films={family} type={'movies'} />
        <FilmList title="Drama" films={drama} type={'movies'} />
        <FilmList title="Sci-Fi" films={scifi} type={'movies'} />
        <FilmList title="Kids" films={kids} type={'movies'} />
      </div>
    </div>

  );
};

export default TV;
