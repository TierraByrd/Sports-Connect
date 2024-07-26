import React from "react";
import { Link } from "react-router-dom";
import './SportsList.css'; 


function SportsList() {
  return (
    <div className="sports-list-container">
      <h2>Youth Sports</h2>
      <Link to='/sports/single'>Solo Sports</Link>
      <br />
      <br />
      <Link to='/sports/team'>Team Sports</Link>
    </div>
  );
}

export default SportsList;