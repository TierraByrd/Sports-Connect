import React, { useEffect, useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchTeams } from "../../redux/sagas/teams.saga";

function TeamsList() {
  const { sport_name, team_name } = useParams();
  const dispatch = useDispatch();
  const teamsList = useSelector(state => state.teamsReducer.teams);

  useEffect(() => {
      // Fetch teams for the selected sport
      dispatch(fetchTeams(sport_name));
  
  }, [dispatch, sport_name, team_name]);

  if (!teamsList) {
    return <div>Loading Teams...</div>;
  }

  return (
    <div>
      <h2>Teams for {sport_name}</h2>
      <ul>
        {teamsList.map(team => (
          <li key={team.id}>
            <Link to={`/${sport_name}/teams/team_name`}>{team.team_name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamsList;