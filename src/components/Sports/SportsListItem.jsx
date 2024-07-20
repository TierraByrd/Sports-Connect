import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";


function SportsListItem({ sport }) {
  return (
    <div>
      <h3>{sport.sport_name}</h3>
      <Link to={`/sports/${sport.sport_name}`}>View Details</Link>
    </div>
  );
}


export default SportsListItem;