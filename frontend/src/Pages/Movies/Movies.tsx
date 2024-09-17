/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Navbar from "../../Components/NavBar/NavBar";
import FilmList from "../../Components/List/List";
import { movieGenres } from "../../genres";
import { getMedia } from "../../Utility/getMedia";
import { filterContent } from "../../Utility/searchHandler";

export const Movies = () => {
  const [action, setAction] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [horror, setHorror] = useState([]);
  const [crime, setCrime] = useState([]);
  const [family, setFamily] = useState([]);
  const [drama, setDrama] = useState([]);
  const [scifi, setScifi] = useState([]);
  const [fantasy, setFantasy] = useState([]);

  const allContent = [
    ...action,
    ...comedy,
    ...horror,
    ...crime,
    ...family,
    ...drama,
    ...scifi,
    ...fantasy,
  ];

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filtered, setfiltered] = useState<any[]>([]);

  const handleSearch = (e: { target: { value: any } }) => {
    const value: string = e.target.value;
    setSearchTerm(value);

    const uniqueContent = filterContent(allContent, value);
    setfiltered(uniqueContent);
  };

  useEffect(() => {
    getMedia(`/api/v1/movies/genre/${movieGenres.action}`, setAction);
    getMedia(`/api/v1/movies/genre/${movieGenres.comedy}`, setComedy);
    getMedia(`/api/v1/movies/genre/${movieGenres.horror}`, setHorror);
    getMedia(`/api/v1/movies/genre/${movieGenres.crime}`, setCrime);
    getMedia(`/api/v1/movies/genre/${movieGenres.family}`, setFamily);
    getMedia(`/api/v1/movies/genre/${movieGenres.drama}`, setDrama);
    getMedia(`/api/v1/movies/genre/${movieGenres.scifi}`, setScifi);
    getMedia(`/api/v1/movies/genre/${movieGenres.fantasy}`, setFantasy);
  }, []);


  return (
    <div>
      <Navbar
        value={searchTerm}
        handler={handleSearch}
      />

      {searchTerm.length === 0 ? (
        <div className="min-h-screen main-bg">
          <FilmList title="Action" films={action} type={"movies"} />
          <FilmList title="Comedy" films={comedy} type={"movies"} />
          <FilmList title="Horror" films={horror} type={"movies"} />
          <FilmList title="Crime" films={crime} type={"movies"} />
          <FilmList title="Family" films={family} type={"movies"} />
          <FilmList title="Drama" films={drama} type={"movies"} />
          <FilmList title="Sci-Fi" films={scifi} type={"movies"} />
          <FilmList title="Fantasy" films={fantasy} type={"movies"} />
        </div>
      ) : (
        <div className="main-h-screen main-bg">
          <FilmList title="Searched Content" films={filtered} type={"movies"} />
        </div>
      )}
    </div>
  );
};

export default Movies;
