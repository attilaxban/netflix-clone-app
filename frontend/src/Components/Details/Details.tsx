import React, { useEffect, useState } from 'react';
import Navbar from '../NavBar/NavBar';
import { Minus, Plus, X } from 'lucide-react';

export const Details = ({ details, trailerKey }) => {
  const { backdrop_path, title, release_date, vote_average, genres, overview } = details;
  const [added, setAdded] = useState(false);

  const getHistory = async () => {
    try {
      const response = await fetch('/api/v1/search/history', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

    
        if (data.content.includes(title)) {
          setAdded(true); 
        } else {
          setAdded(false); 
        }
      } else {
        throw new Error("Error finding history");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.error("Internal Server Error");
    }
  };

  useEffect(() => {
    if(title){
      getHistory(); 
    }
    
  }, [title,getHistory]);


  const updateHistory = async (e: { preventDefault: () => void; },title: undefined) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/v1/users/update/history', {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setAdded(true); 
      }
    } catch (error) {
      console.error("Error adding movie to history");
    }
  };

 
  const removeFromHistory = async (e: { preventDefault: () => void; },title: undefined) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/v1/users/update/history/delete', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setAdded(false); 
      } else {
        throw new Error('Failed to remove movie from history');
      }
    } catch (error) {
      console.error('Error removing from history:', error);
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

      <div className="relative z-10">
        <Navbar />
        <div className='absolute right-3'>
        <X onClick={() => history.back()} className='text-red-600 hover:cursor-pointer hover:text-gray-400' size={36} strokeWidth={3}/>
        </div>
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
                genres.map((genre: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                  <span
                    key={genre.id}
                    className="bg-red-600 px-3 py-1 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
            </div>
            <p className="text-gray-300">{overview}</p>

            <div className='flex items-center space-x-5'>
              <button className="bg-red-600 px-6 py-2 rounded-full text-lg font-semibold hover:bg-red-800 transition duration-200">
                Watch Now 
              </button>
              {added ? (
                <Minus onClick={(e) => removeFromHistory(e,title)} />
              ) : (
                <Plus onClick={(e) => updateHistory(e,title)} />
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
