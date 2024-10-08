/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Navbar from "../../Components/NavBar/NavBar";
import FilmList from "../../Components/List/List";
import { tvGenres } from "../../genres";
import { filterContent } from "../../Utility/searchHandler";
import { getMedia } from "../../Utility/getMedia";

export const TV = () => {
  const [action, setAction] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [animation, setanimation] = useState([]);
  const [crime, setCrime] = useState([]);
  const [family, setFamily] = useState([]);
  const [drama, setDrama] = useState([]);
  const [scifi, setScifi] = useState([]);
  const [kids, setKids] = useState([]);

  const allContent = [
    ...action,
    ...comedy,
    ...animation,
    ...crime,
    ...family,
    ...drama,
    ...scifi,
    ...kids,
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setfiltered] = useState<any[]>([]);

  const handleSearch = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setSearchTerm(value);

    const uniqueContent = filterContent(allContent, value);
    setfiltered(uniqueContent);
  };

  useEffect(() => {
    getMedia(`/api/v1/tv/genre/${tvGenres.actionAndAdventure}`, setAction);
    getMedia(`/api/v1/tv/genre/${tvGenres.comedy}`, setComedy);
    getMedia(`/api/v1/tv/genre/${tvGenres.animation}`, setanimation);
    getMedia(`/api/v1/tv/genre/${tvGenres.crime}`, setCrime);
    getMedia(`/api/v1/tv/genre/${tvGenres.family}`, setFamily);
    getMedia(`/api/v1/tv/genre/${tvGenres.drama}`, setDrama);
    getMedia(`/api/v1/tv/genre/${tvGenres.scifiFantasy}`, setScifi);
    getMedia(`/api/v1/tv/genre/${tvGenres.kids}`, setKids);
  }, []);

  return (
    <div className="main-bg min-h-screen">
      <Navbar
        value={searchTerm}
        handler={handleSearch}
      />
      {searchTerm.length === 0 ? (
        <div className="min-h-screen main-bg">
          <FilmList title="Action" films={action} type={"tv"} />
          <FilmList title="Comedy" films={comedy} type={"tv"} />
          <FilmList title="Animation" films={animation} type={"tv"} />
          <FilmList title="Crime" films={crime} type={"tv"} />
          <FilmList title="Family" films={family} type={"tv"} />
          <FilmList title="Drama" films={drama} type={"tv"} />
          <FilmList title="Sci-Fi" films={scifi} type={"tv"} />
          <FilmList title="Kids" films={kids} type={"tv"} />
        </div>
      ) : (
        <div className="main-h-screen main-bg">
          <FilmList title="Searched Content" films={filtered} type={"tv"} />
        </div>
      )}
    </div>
  );
};

export default TV;
