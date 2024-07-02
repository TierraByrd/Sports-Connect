import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function SportsDetail() {
  const { sport_name } = useParams();
  const [sportDetails, setSportDetails] = useState({}); 

  useEffect(() => {
    axios.get(`/api/sports/${sport_name}`)
      .then(response => {
        setSportDetails(response.data[0]); // only one sport is returned
      })
      .catch(error => {
        console.error('Error fetching sport details:', error);
      });
  }, [sport_name]); // Fetch data whenever sport_name changes

  // Check if sportDetails is still an empty object
  if (Object.keys(sportDetails).length === 0) {
    return <div>Page Loading</div>;
  }

  return (
    <div>
      <h2>{sportDetails.sport_name} Home Page</h2>
      <p>{sportDetails.sport_description}</p>
      <img src={sportDetails.image_url} alt={sportDetails.sport_name} />
    </div>
  );
}

export default SportsDetail;

