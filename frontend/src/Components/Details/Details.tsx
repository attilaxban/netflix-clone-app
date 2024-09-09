import React from 'react'
import Navbar from '../NavBar/NavBar';

export const Details = ({details,trailerKey}) => {

    const {backdrop_path,title,release_date,vote_average,genres,overview} = details;

    return (
        <div className="relative min-h-screen">
          <div
            className="absolute inset-0 bg-cover bg-center blur-lg"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
            }}
          ></div>
    
    
          <div className="relative z-10">
            <Navbar />
            <div className="flex flex-col md:flex-row items-center min-h-screen bg-black bg-opacity-75 p-4 md:p-12 space-y-6 md:space-y-0 md:space-x-12">
              <div className="w-full md:w-1/2">
                {trailerKey ? (
                  <div className="relative w-full">
                    <div className="relative" style={{ paddingTop: '56.25%' }}>
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${trailerKey}`}
                        title="YouTube trailer"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                ) : (
                  <p className="text-white text-lg">No trailer found...</p>
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
                    genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-red-600 px-3 py-1 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                </div>
                <p className="text-gray-300">{overview}</p>
                <button className="bg-red-600 px-6 py-2 rounded-full text-lg font-semibold hover:bg-red-500 transition duration-200">
                  Watch Now
                </button>
              </div>
            </div>
          </div>
        </div>
      );
}
