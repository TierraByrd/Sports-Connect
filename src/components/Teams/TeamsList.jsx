import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

function TeamsList() {
  const dispatch = useDispatch();
  const { sport_name } = useParams();
  const teamsList = useSelector((state) => state.teamsReducer.teams);

  useEffect(() => {
    dispatch({ type: "FETCH_TEAMS" }); // Dispatch the action to fetch teams
  }, [dispatch, sport_name]);

  if (!teamsList) {
    return <div>Loading Teams...</div>;
  }

  if (teamsList.length === 0) {
    return <div>No teams found.</div>;
  }

  return (
    <div>
      <h2>Teams for {sport_name}</h2>
      <ul>
        {teamsList.map((team) => (
          <li key={team.id}>
            <Link to={`/teams/${team.id}`}>{team.team_name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamsList;