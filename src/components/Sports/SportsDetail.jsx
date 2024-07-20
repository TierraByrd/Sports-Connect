import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function SportDetails() {
  const { sport_type, sport_name} = useParams();
  const dispatch = useDispatch();
  const sportsList = useSelector(state => state.sportReducer.details);
  const teams = useSelector(state => state.teamReducer.teamDetails);

  useEffect(() => {
    // Fetch sports details based on sport_type
    if (sport_type === 'single') {
      dispatch({ type: 'FETCH_SINGLE_SPORTS' });
    } else if (sport_type === 'team') {
      dispatch({ type: 'FETCH_TEAM_SPORTS' });
    }

    // Fetch teams based on team_name
    if (sport_type) {
      axios.get(`/api/teams`)
        .then(response => {
          dispatch({
            type: 'SET_TEAMS',
            payload: response.data,
          });
        })
        .catch(error => {
          console.error('Error fetching teams:', error);
        });
    }

  }, [dispatch, sport_type, sport_name]);

  if (!sportsList || sportsList.length === 0 || !teams) {
    return <p>Loading Sport Details...</p>;
  }

  const sport = sportsList.find(sport => sport.sport_name === sport_type);

  if (!sport) {
    return <p>Sport not found</p>;
  }

  return (
    <div>
      <h2>{sport.sport_name}'s Home Page</h2>
      <p>{sport.sport_description}</p>

      <h3>
        <Link to={`/teams/${sport.sport_name}`}>Current Teams</Link>
      </h3>

      {/* Render teams here if needed */}
    </div>
  );
}

export default SportDetails;