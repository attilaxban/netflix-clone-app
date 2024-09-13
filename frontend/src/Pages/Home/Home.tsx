/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Navbar from "../../Components/NavBar/NavBar";
import FilmList from "../../Components/List/List";
import { getMedia } from "../../Utility/getMedia";
import { filterContent } from "../../Utility/searchHandler";

export const Home = () => {
  const [popularMovies, setPopularMovies] = useState<any[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<any[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<any[]>([]);

  const [popularTV, setPopularTV] = useState<any[]>([]);
  const [onTheAirTV, setOnTheAirTV] = useState<any[]>([]);
  const [topRatedTV, setTopRatedTV] = useState<any[]>([]);

  const allContent = [...popularMovies, ...upcomingMovies, ...topRatedMovies];

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filtered, setFiltered] = useState<any[]>([]);

  const [trending, setTrending] = useState<any>({});
  const [trailerKey, setTrailerKey] = useState("");

  const handleSearch = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setSearchTerm(value);

    const uniqueContent = filterContent(allContent, value);
    setFiltered(uniqueContent);
  };

  const getTrendingContent = async () => {
    try {
      const response = await fetch("/api/v1/movies/trendings");
      const data = await response.json();

      if (response.ok) {
        setTrending(data.trailers);
      } else {
        console.error(`Server responded with ${response.status} status`);
      }
    } catch (error) {
      console.error("Internal server error", error);
    }
  };

  const getTrendingTrailer = async (id: string, type: string) => {
    const endpoint = `/api/v1/${
      type === "movie" ? "movies" : "tv"
    }/${id}/trailers`;
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setTrailerKey(data.trailers[1]?.key || "");
      } else {
        console.error(`Server responded with ${response.status} status`);
      }
    } catch (error) {
      console.error("Internal server error", error);
    }
  };

  useEffect(() => {
    getMedia("/api/v1/movies/popular", setPopularMovies);
    getMedia("/api/v1/movies/upcoming", setUpcomingMovies);
    getMedia("/api/v1/movies/top_rated", setTopRatedMovies);

    getMedia("/api/v1/tv/popular", setPopularTV);
    getMedia("/api/v1/tv/on_the_air", setOnTheAirTV);
    getMedia("/api/v1/tv/top_rated", setTopRatedTV);

    getTrendingContent();
  }, []);

  useEffect(() => {
    if (trending.id && trending.media_type) {
      getTrendingTrailer(trending.id, trending.media_type);
    }
  }, [trending]);

  return (
    <div className="main-bg min-h-screen">
      <Navbar
        value={searchTerm}
        setter={setSearchTerm}
        handler={handleSearch}
      />

      <div className="flex justify-center items-center w-full">
        {trailerKey && (
          <div className="relative w-full max-w-4xl">
            <div className="relative" style={{ paddingTop: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&mute=1`}
                title="YouTube trailer"
                frameBorder="0"
                allow="picture-in-picture; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>

      {searchTerm.length === 0 ? (
        <div className="min-h-screen main-bg">
          <FilmList
            title="Popular movies on Netflix"
            films={popularMovies}
            type={"movies"}
          />
          <FilmList
            title="Upcoming movies"
            films={upcomingMovies}
            type={"movies"}
          />
          <FilmList
            title="Top Rated Movies"
            films={topRatedMovies}
            type={"movies"}
          />

          <FilmList
            title="Popular TV's on Netflix"
            films={popularTV}
            type={"tv"}
          />
          <FilmList title="On The Air TV's" films={onTheAirTV} type={"tv"} />
          <FilmList title="Top Rated TV's" films={topRatedTV} type={"tv"} />
        </div>
      ) : (
        <div className="min-h-screen main-bg">
          <FilmList title="Searched Content" films={filtered} type={"movies"} />
        </div>
      )}
    </div>
  );
};

export default Home;
