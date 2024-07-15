import React, { useEffect } from "react";
import SportsListItem from "./SportsListItem";
import { useDispatch, useSelector } from "react-redux";

function TeamSports() {
  const dispatch = useDispatch();
  const teamSports = useSelector(state => state.sportReducer.details);

  useEffect(() => {
    dispatch({ type: 'FETCH_TEAM_SPORTS' });  // Make sure action type matches your saga
  }, [dispatch]);
  
  // Check if singleSports is undefined or empty before mapping
  if (!teamSports || teamSports.length === 0) {
    return <p>Team Sports Loading...</p>;  // or any loading indicator
  }

  return (
    <div>
      <h2>
        Team Sports</h2>
      <ul>
        {teamSports.map(sport => (
          <SportsListItem key={sport.sport_name} sport={sport} />
        ))}
      </ul>
    </div>
  );
}
  
export default TeamSports;