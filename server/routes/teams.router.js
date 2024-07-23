const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all teams
router.get('/', (req, res) => {
  const queryText = `
    SELECT * 
    FROM "teams"
  `;
  pool.query(queryText)
    .then((results) => {
      console.log('Team GET route works!', results.rows);
      res.send(results.rows);
    })
    .catch(error => {
      console.error('Error in GET for teams ', error);
      res.sendStatus(500);
    });
});
 //GET  specific teams for a sport
 router.get('/:sport_name', (req, res) => {
  const sport_name = req.params.sport_name;
  const queryText = `
 SELECT teams.*
  FROM teams
  JOIN sports ON teams.sport_id = sports.id
  WHERE sports.sport_name = $1
  `;
  const queryValues = [sport_name];
  
  pool.query(queryText, queryValues)
  .then((results) =>{
    console.log('GET specific teams works', results.rows);
    res.send(results.rows);
  })
  .catch((error) => {
    console.error('Error GET specific teams', error)
    res.sendStatus(500);
  })
 })
 //GET detail for a team
 router.get('/:team_name', (req,res) => {
const team_name = req.params.team_name;
const queryText = `
SELECT *
FROM teams
WHERE team_name = $1
`;
const queryValues = [team_name];
pool.query(queryText, queryValues)
.then((results) => {
  res.send(results.rows)
})
.catch((error) => {
  console.error('Error GET details for team', error)
  res.sendStatus(500);
})
 })
module.exports = router;