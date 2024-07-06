import React, { useEffect, useState } from "react";
import SportsListItem from "./SportsListItem";
import axios from "axios";

function TeamSports() {
    const [teamSports, setTeamSports] = useState([]);
  
    useEffect(() => {
        axios.get('/api/sports/teamsports')
        .then(response => {
            setTeamSports(response.data);
        })
        .catch(error => {
            console.error('Error fetching team sports: ', error);
        })
    }, []);
  
    return (
      <div>
        <h2>Team Sports</h2>
        <ul>
        {teamSports.map(sport => (
          <SportsListItem key={sport.id} sport={sport} />
        ))}
      </ul>
      </div>
    );
  }
  
  export default TeamSports;