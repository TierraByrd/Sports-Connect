import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SportDetails = () => {
  const { sport_name } = useParams();
  const [sportDetails, setSportDetails] = useState([]); 

  
  useEffect(() => {
    axios.get(`/api/sports/${encodeURIComponent(sport_name)}`)
      .then(response => {
        setSportDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching sport details:', error);
      });
  }, [sport_name]);

  if (!sportDetails) {
    return <p>Loading sport details...</p>;
  }

  return (
    <div>
      <h2>{sportDetails.sport_name}</h2>
      <p>{sportDetails.sport_description}</p>
      <p>Type: {sportDetails.sport_type}</p>
    </div>
  );
};

export default SportDetails;