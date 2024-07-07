import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchTeams } from "../../redux/sagas/teams.saga";

function TeamsList() {
  const { sport_name } = useParams();
  const dispatch = useDispatch();
  const teams = useSelector(state => state.teamsReducer.teams); // Assuming structure of your state

  useEffect(() => {
    // Fetch teams for the selected sport
    dispatch(fetchTeams(sport_name));
  }, [dispatch, sport_name]);

  if (!teams) {
    return <div>Loading teams...</div>;
  }

  return (
    <div>
      <h2>Teams for {sport_name}</h2>
      <ul>
        {teams.map(team => (
          <li key={team.id}>
            <Link to={`/${sport_name}/teams/${team.id}`}>{team.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamsList;