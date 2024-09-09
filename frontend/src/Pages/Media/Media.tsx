import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Details } from '../../Components/Details/Details';

export const Media = () => {
  const [details, setDetails] = useState({});
  const [trailerKey, setTrailerKey] = useState('');
  const location = useLocation();
  
  const getDetails = async (id, type) => {
    const endpoint = `/api/v1/${type}/${id}/details`;
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        credentials: 'include',
      });
  
      if (response.ok) {
        const data = await response.json();
        setDetails(data.content);
        console.log(data);
      } else {
        throw new Error('Failed to GET details');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Internal Server Error');
    }
  };
  
  const getTrailer = async (id, type) => {
    const endpoint = `/api/v1/${type}/${id}/trailers`;
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        credentials: 'include',
      });
  
      if (response.ok) {
        const data = await response.json();
        setTrailerKey(data.trailers[0]?.key || '');
      } else {
        throw new Error('Failed to GET trailers');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Internal Server Error');
    }
  };
  
  useEffect(() => {
    const id = location.state.id;
    const type = location.state.type; 
    
    if (id && type) {
      getDetails(id, type);
      getTrailer(id, type);
    }
  }, [location.state.id, location.state.type]);

  return (
    <div>
        <Details
        details={details}
        trailerKey={trailerKey} 
        />
    </div>
  );
};

export default Media;
