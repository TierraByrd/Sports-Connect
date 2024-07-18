import React, { useEffect} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function TeamDetails() {
  const {team_name} = useParams();
  const dispatch = useDispatch();
  const teamDetails = useSelector(state => state.teamReducer.details)

  useEffect(() => {
    axios.get(`/api/teams/${team_name}`)
      .then((response) => {
     dispatch({
      type: "SET_TEAM_DETAILS",
      payload: response.data
     })
      })
      .catch(error => {
        console.error('Error fetching associated  teams:', error);
      });
  }, [dispatch, team_name]);

  if (!teamDetails) {
    return <div>Loading team details...</div>;
  }

  return (
    <div>
      <h2>Team Details for {team_name}</h2>
      <p>Team Name: {teamDetails.team_name}</p>
      <p>Coach: {teamDetails.coach_name}</p>
      <p>Contact Info: {teamDetails.contact_info}</p>
      <p>Current Rating: {teamDetails.current_rating}</p>
      
      <Link to={`/${team_name}/reviews`} >
      <button>Leave a Review</button>
      </Link>
    </div>
  );
}

export default TeamDetails;