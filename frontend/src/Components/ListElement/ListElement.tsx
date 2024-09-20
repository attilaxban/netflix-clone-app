/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  useState,
} from "react";
import { filterContent } from "../../Utility/searchHandler";
import Navbar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";

export const ListElement = ({ content } : {content : any}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setfiltered] = useState<any[]>([]);

  const navigate = useNavigate();

  const handleClick = (id: any, type: any) => {
    navigate("/media", { state: { id, type } });
  };

  const handleSearch = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setSearchTerm(value);

    const uniqueContent = filterContent(content, value);
    setfiltered(uniqueContent);
  };

  return (
    <div>
      <Navbar
        value={searchTerm}
        handler={handleSearch}
      />
      {searchTerm.length === 0 ? (
        <div className="main-bg min-h-screen flex justify-center p-8">
          <div className="absolute inline-flex flex-wrap gap-16 justify-center">
            {content &&
              content.map(
                (x: {
                  id: Key | null | undefined;
                  type: any;
                  poster_path: any;
                  title:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | null
                    | undefined;
                }) => (
                  <div
                    key={x.id}
                    className="relative bg-gray-800 rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                    onClick={() => handleClick(x.id, x.type)}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w300${x.poster_path}`}
                      alt={`${x.title}`}
                      className="movie-image block object-cover rounded-lg w-auto h-auto"
                    />
                    <div className="movie-overlay absolute inset-0 bg-black bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      <div>
                        <h3 className="movie-title text-lg font-bold text-white text-center">
                          {x.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>
        </div>
      ) : (
        <div className="main-bg min-h-screen flex justify-center p-8">
          <div className="absolute inline-flex flex-wrap gap-16 justify-center">
            {filtered &&
              filtered.map((x) => (
                <div
                  key={x.id}
                  className="relative bg-gray-800 rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => handleClick(x.id, x.type)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w300${x.poster_path}`}
                    alt={x.title}
                    className="movie-image block object-cover rounded-lg w-auto h-auto"
                  />
                  <div className="movie-overlay absolute inset-0 bg-black bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <div>
                      <h3 className="movie-title text-lg font-bold text-white text-center">
                        {x.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
