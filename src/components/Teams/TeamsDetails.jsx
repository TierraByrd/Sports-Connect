import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function TeamDetails() {
  const { sport_name, teamId } = useParams();
  const [teamDetails, setTeamDetails] = useState(null);

  useEffect(() => {
    // Fetch team details by teamId
    axios.get(`/api/${sport_name}/teams/${teamId}`)
      .then(response => {
        setTeamDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching team details:', error);
      });
  }, [sport_name, teamId]);

  if (!teamDetails) {
    return <div>Loading team details...</div>;
  }

  return (
    <div>
      <h2>Team Details</h2>
      <p>Team Name: {teamDetails.name}</p>
      <p>Coach: {teamDetails.coach}</p>
      {/* Add other team details as needed */}
    </div>
  );
}

export default TeamDetails;