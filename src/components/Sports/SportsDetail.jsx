import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function SportDetails() {
  const { sport_type } = useParams();
  const dispatch = useDispatch();
  const sportsList = useSelector(state => state.sportReducer.details);

  useEffect(() => {
    if (sport_type === 'single') {
      dispatch({ type: 'FETCH_SINGLE_SPORTS' });
    } else if (sport_type === 'team') {
      dispatch({ type: 'FETCH_TEAM_SPORTS' });
    }
  }, [dispatch, sport_type]);

  if (!sportsList || sportsList.length === 0) {
    return <p>Loading Sport Details...</p>;
  }

  // Find the sport object in details array that matches sport_type
  const sport = sportsList.find(sport => sport.sport_name.toLowerCase() === sport_type.toLowerCase());

  if (!sport) {
    return <p>Sport not found</p>;
  }

  return (
    <div>
      <h2>{sport.sport_name}'s Home Page</h2>
      <p>{sport.sport_description}</p>
   <br />
   <br />
   <br />
   <Link to='/teams'>Current Teams</Link>
    </div>
  );
}

export default SportDetails;