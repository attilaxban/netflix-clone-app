import React, { useEffect, useState } from "react";

const Popular: React.FC = () => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [populars, setPopulars] = useState<any[]>([]);

    useEffect(() => {
        const getPopularMovies = async () => {
            try {
                const response = await fetch('/api/v1/movies/popular');
                const data = await response.json();

                if (response.ok) {
                    setPopulars(data.results);
                } else {
                    throw new Error('Cannot fetch movies');
                }
            } catch (error) {
                console.error(error);
            }
        };

        getPopularMovies();
    }, []);

    return (
        <div>
            <ul>
                {populars && populars.map(movie => (
                    <li key={movie.id}>{movie.original_title}</li> 
                ))}
            </ul>
        </div>
    );
}

export default Popular;
