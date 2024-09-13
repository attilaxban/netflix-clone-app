/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const FilmList = ({ title, films, type }) => {
  const scrollRef = useRef<any>(null);
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleClick = (id: any) => {
    navigate("/media", { state: { id, type } });
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      const maxScrollLeft =
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

      if (scrollPosition <= 0) {
        scrollRef.current.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
        setScrollPosition(maxScrollLeft);
      } else {
        scrollRef.current.scrollBy({
          left: -500,
          behavior: "smooth",
        });
        setScrollPosition((prev) => prev - 500);
      }
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const maxScrollLeft =
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

      if (scrollPosition >= maxScrollLeft) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        setScrollPosition(0);
      } else {
        scrollRef.current.scrollBy({
          left: 500,
          behavior: "smooth",
        });
        setScrollPosition((prev) => prev + 500);
      }
    }
  };

  return (
    <div className="relative mb-8">
      <h2 className="text-2xl font-bold text-white ml-8 mb-4">{title}</h2>

      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition z-10"
        style={{ zIndex: 100 }}
      >
        &#8592;
      </button>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 p-8 scrollbar-hide scroll-smooth"
        style={{ scrollBehavior: "smooth" }}
      >
        {films.length > 0 ? (
          films.map(
            (film: {
              id: React.Key | null | undefined;
              poster_path: any;
              title:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | null
                | undefined;
            }) => (
              <div
                key={film.id}
                className="relative flex-shrink-0 w-40 bg-gray-800 rounded-lg transform transition-transform duration-300 hover:scale-110"
                onClick={() => handleClick(film.id, film)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                  alt={film.title}
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center p-4 cursor-pointer">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {film.title}
                    </h3>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <p className="text-white">No content available</p>
        )}
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition z-10"
        style={{ zIndex: 100 }}
      >
        &#8594;
      </button>
    </div>
  );
};

export default FilmList;
