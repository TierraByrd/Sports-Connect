import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function SportsList() {

  return (
    <div>
      <h2>Youth Sports</h2>
      <Link to='/singlesports'>Solo Sports</Link>
     <br />
     <br />
      <Link to='/teamsports'>Team Sports</Link>
     
    </div>
  );
}

export default SportsList;