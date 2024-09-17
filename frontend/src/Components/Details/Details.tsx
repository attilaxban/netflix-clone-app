/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Navbar from "../NavBar/NavBar";
import { useLocation } from "react-router-dom";
import FilmList from "../List/List";
import { Minus, Plus } from "lucide-react";

export const Details = ({ details, trailerKey, similar, type } : {details : any, trailerKey : string, similar : any, type : string}) => {
  const {
    backdrop_path,
    id,
    title,
    release_date,
    vote_average,
    genres,
    overview,
    poster_path,
  } = details;
  const [added, setAdded] = useState(false);
  const location = useLocation();

  const getList = async () => {
    try {
      const response = await fetch("/api/v1/users/list", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        console.log(
          `Server responsed with ${response.status} status` +
            { message: "success" }
        );
        const data = await response.json();
        const movieExists = data.content.some(
          (item: { id: any }) => item.id === id
        );
        setAdded(movieExists);
      } else {
        throw new Error(
          `Server responsed with ${response.status} status` +
            { message: response.status }
        );
      }
    } catch (error) {
      console.error(error);
      throw new Error(
        `Server responsed with 500 status.` +
          { message: "Internal server error" }
      );
    }
  };

  useEffect(() => {
    if (id) {
      getList();
    }
  }, [id]);

  const updateList = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault();
    const movie = { ...details, type: location.state.type };

    try {
      const response = await fetch("/api/v1/users/update/list", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });

      if (response.ok) {
        console.log(
          `Server responded with ${response.status} status - success`
        );
        setAdded(true);
      } else {
        throw new Error(
          `Server responded with ${response.status} status - Error: ${response.status}`
        );
      }
    } catch (error) {
      console.error(error);
      throw new Error(
        `Server responsed with 500 status.` +
          { message: "Internal server error" }
      );
    }
  };

  const removeFromList = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.preventDefault();
    const movie = { ...details, type: location.state.type };

    try {
      const response = await fetch("/api/v1/users/delete/list/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });

      if (response.ok) {
        console.log(
          `Server responsed with ${response.status} status` +
            { message: "success" }
        );
        setAdded(false);
      } else {
        throw new Error(
          `Server responsed with ${response.status} status` +
            { message: response.status }
        );
      }
    } catch (error) {
      console.error(error);
      throw new Error(
        `Server responsed with 500 status.` +
          { message: "Internal server error" }
      );
    }
  };

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center blur-lg"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
        }}
      ></div>

      <div className={`relative z-10 ${trailerKey ? "" : "main-bg"}`}>
        <Navbar value={undefined} handler={undefined} />
        <div className="flex flex-col md:flex-row items-center min-h-screen bg-opacity-75 p-4 md:p-12 space-y-6 md:space-y-0 md:space-x-12">
          <div className="w-full md:w-1/2">
            {trailerKey ? (
              <div className="relative w-full">
                <div className="relative" style={{ paddingTop: "56.25%" }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&mute=1`}
                    title="YouTube trailer"
                    frameBorder="0"
                    allow="accelerometer ; autoplay  ; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ) : (
              <p className="text-white text-lg flex items-center justify-end">
                <img
                  src={`https://image.tmdb.org/t/p/w300${poster_path}`}
                  alt=""
                />
              </p>
            )}
          </div>

          <div className="w-full md:w-1/2 text-white space-y-4">
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-sm text-gray-300">{release_date}</p>
            <div className="flex space-x-4">
              <p className="text-lg font-semibold">Rating: {vote_average}</p>
            </div>
            <div className="flex space-x-2">
              {genres &&
                genres.map(
                  (genre: {
                    id: React.Key | null | undefined;
                    name:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                  }) => (
                    <span
                      key={genre.id}
                      className="bg-red-600 px-3 py-1 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  )
                )}
            </div>
            <p className="text-inherit">{overview}</p>

            <div className="flex items-center space-x-5">
              <button className="bg-red-600 px-6 py-2 rounded-full text-lg font-semibold hover:bg-red-800 transition duration-200">
                Watch Now
              </button>
              {added ? (
                <Minus onClick={(e) => removeFromList(e)} />
              ) : (
                <Plus onClick={(e) => updateList(e)} />
              )}
            </div>
          </div>
        </div>
        <div>
          {similar ? (
            <FilmList title={"You Might Like It"} films={similar} type={type} />
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
};
