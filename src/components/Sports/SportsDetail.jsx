import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function SportsDetail() {
  const { sport_name } = useParams();
  const [sportDetails, setSportDetails] = useState({});
  const [teams, setTeams] = useState([]); // Correct initialization for teams state

    useEffect(() => {
      // Fetch sport details by sport_name
      axios.get(`/api/sports/${sport_name}`)
        .then(response => {
          setSportDetails(response.data[0]); // Assuming there is only one sport with the given name
        })
        .catch(error => {
          console.error('Error fetching sport details:', error);
        });
      
      // Fetch teams associated with the sport by sport_id
      axios.get(`/api/sports/${sport_name}`)
        .then(response => {
          setTeams(response.data); // Update teams state with fetched data
        })
        .catch(error => {
          console.error('Error fetching teams:', error);
        });
    }, [sport_name]);
  return (
    <div>
      <h2>{sportDetails.sport_name}'s Home Page</h2>
      <p>{sportDetails.sport_description}</p>
      <img src="" alt={sportDetails.sport_name} />

      <h4>Current Teams:</h4>
      <ul>
        {teams.map(team => (
          <li key={team.id}>
            <strong>{team.team_name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SportsDetail;
