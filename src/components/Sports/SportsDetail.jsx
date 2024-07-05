import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeams } from "../../redux/sagas/teams.saga";

function SportsDetail() {
  const { sport_name } = useParams();
  const [sportDetails, setSportDetails] = useState({});
  const teamsReducer = useSelector(state => state.teams);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch sport details by sport_name
    axios.get(`/api/sports/${sport_name}`)
      .then((response) => {
        setSportDetails(response.data[0]);
      })
      .catch(error => {
        console.error('Error fetching sport details:', error);
      });
    
    // Dispatch action to fetch teams associated with the sport
    dispatch(fetchTeams(sport_name));

  }, [dispatch, sport_name]);

  // Handle rendering when sportDetails or teams are still loading or not available
  if (!sportDetails || !sportDetails.sport_name || !teamsReducer) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{sportDetails.sport_name}'s Home Page</h2>
      <p>{sportDetails.sport_description}</p>
      <img src="placeholder.jpg" alt={sportDetails.sport_name} /> {/* Placeholder image */}
      <div>
        <h4>{sportDetails.sport_name}'s Current Teams:</h4>
        <ul>
          {teamsReducer.map((team) => (
            <li key={team.id}>
              <strong>{team.team_name}</strong>
              <p>Coach: {team.coach_name}</p>
              <p>Contact: {team.contact_info}</p>
              <p>Rating: {team.current_rating}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SportsDetail;
