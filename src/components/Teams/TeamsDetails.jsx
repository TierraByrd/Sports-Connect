import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function TeamDetails() {
  const { sport_name, team_name } = useParams();
  const [teamDetails, setTeamDetails] = useState([]);

  useEffect(() => {
    // Fetch team details by sport_name
    axios.get(`/`)
      .then(response => {
        setTeamDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching associated  teams:', error);
      });
  }, [sport_name]);

  if (!teamDetails) {
    return <div>Loading team details...</div>;
  }

  return (
    <div>
      <h2>Team Details for {sport_name}</h2>
      <p>Team Name: {team_name}</p>
      <p>Coach: {teamDetails.coach_name}</p>
      <p>Contact Info: {teamDetails.contact_info}</p>
      <p>Current Rating: {teamDetails.current_rating}</p>
      {/* Add other team details as needed */}
      <Link to={`/${team_name}/reviews`} >
      <button>Leave a Review</button>
      </Link>
    </div>
  );
}

export default TeamDetails;