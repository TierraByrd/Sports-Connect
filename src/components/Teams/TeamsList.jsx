import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";


function TeamsList() {
  const dispatch = useDispatch();
  const {sport_name } = useParams();
  const teamsList = useSelector(state => state.teamReducer.teams);

  useEffect(() => {
    // Fetch teams using axios
    axios.get('/api/teams')
      .then((response) => {
        dispatch({ 
          type: "SET_TEAMS", 
          payload: response.data 
        }); 
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
      });
  }, [dispatch, sport_name]); 

  if (!teamsList) {
    return <div>Loading Teams...</div>;
  }
  
  if (!Array.isArray(teamsList) || teamsList.length === 0) {
    return <div>No teams found</div>;
  }

  return (
    <div>
      <h2>Teams for {sport_name}</h2>
      <ul>
        {teamsList.map((team) => (
          <li key={team.team_name}>
              <Link to={`/teams/${team.team_name}`}>{team.team_name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamsList;