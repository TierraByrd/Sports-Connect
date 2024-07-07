import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Teams() {
  const { sport_name } = useParams();
  const [teamsDetails, setTeamsDetails] = useState([]);
  
  useEffect(() => {
    axios.get(`api/${sport_name}/teams`)
      .then(response => {
        console.log('Teams for', sport_name, ':', response.data);
        setTeamsDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
      });
  }, [sport_name]);

  if (!teamsDetails || teamsDetails.length === 0) {
    return <div>Teams Loading...</div>;
  }

  return (
    <div>
      <h2>Teams for {sport_name}</h2>
      <ul>
        {teamsDetails.map(team => (
          <li key={team.id}>
            <h3>{team.team_name}</h3>
            <p>Coach: {team.coach_name}</p>
            <p>Info: {team.contact_info}</p>
            <p>Rating: {team.current_rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Teams;