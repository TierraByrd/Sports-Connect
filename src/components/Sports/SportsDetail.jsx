import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";


function SportsDetail() {
  const { sport_name } = useParams();
  console.log('The sport name is:', sport_name)
  const [sportsDetails, setSportsDetails] = useState() 
  const dispatch = useDispatch()
  
  useEffect(() => {
    // Fetch sport details by sport_name
    axios.get(`/api/sports/${sport_name}`)
      .then(response => {
        setSportsDetails(response.data); 
        dispatch({ type: 'FETCH_SPORTS', payload: response.data }); 
      })
      .catch(error => {
        console.error('Error fetching sport details:', error);
      });
  }, [dispatch, sport_name]);

  
  // Handle rendering while data is loading or if sportsDetails is empty
  if (!sportsDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{sportsDetails[0].sport_name}'s Home Page</h2>
      <p>{sportsDetails[0].sport_description}</p>
      <img src="placeholder.jpg" alt={sportsDetails.sport_name} /> {/* Placeholder image */}
      <div>
        <p>
          Current Teams: 
          <Link to = {`/${sport_name}/teams`}>Click here</Link>
        </p>
      </div>
    </div>
  );
}

export default SportsDetail;

