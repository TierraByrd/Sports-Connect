import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

function TeamDetails() {
  const { sport_name, team_name, coach_name, contact_info, current_rating} = useParams([]);
  const [teamDetails, setTeamDetails] = useState([]);
const dispatch = useDispatch()

  useEffect(() => {
    // Fetch team details by teamId
    axios.get(`/${sport_name}/teams/${team_name}`)
      .then(response => {
        setTeamDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching team details:', error);
      });
  }, [dispatch, sport_name, team_name, coach_name, contact_info, current_rating]);

  if (!teamDetails) {
    return <div>Loading team details...</div>;
  }

  return (
    <div>
      <h2>Team Details for {sport_name}</h2>
      <p>Team Name: </p>
      <p>Coach Name: {coach_name}</p>
      <p>Contact Info: {contact_info}</p>
      <p>Current Rating: {current_rating}</p>
      {/* Add other team details as needed */}
    </div>
  );
}

export default TeamDetails;