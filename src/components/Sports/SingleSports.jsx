import React, { useEffect } from "react";
import SportsListItem from "./SportsListItem";
import { useDispatch, useSelector } from "react-redux";

function SingleSports() {
  const dispatch = useDispatch();
  const singleSports = useSelector(state => state.sportReducer.details);

  useEffect(() => {
    dispatch({ type: 'FETCH_SINGLE_SPORTS' });  
  }, [dispatch]);
  
  // Check if singleSports is undefined or empty before mapping
  if (!singleSports || singleSports.length === 0) {
    return <p>Solo Sports Loading...</p>;  
  }

  return (
    <div>
      <h2>Solo Sports</h2>
      <ul>
        {singleSports.map(sport => (
          <SportsListItem key={sport.sport_name} sport={sport} />
        ))}
      </ul>
    </div>
  );
}
  
export default SingleSports;