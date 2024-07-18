import React from 'react';
import { Link } from 'react-router-dom';

const TeamListItem = ({ team }) => {
  return (
    <div>
      <h3>{team.team_name}</h3>
      <p>Coach: {team.coach_name}</p>
      {/* Add other team details as needed */}
      <Link to={`/teams/${team.team_name}`}>View Team Details</Link>
    </div>
  );
};

export default TeamListItem;