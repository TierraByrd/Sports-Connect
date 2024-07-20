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
    .then((result) => {
      console.log('Team GET route works!', result.rows);
      res.send(result.rows);
    })
    .catch(error => {
      console.error('Error in GET for teams ', error);
      res.sendStatus(500);
    });
});
 //GET  specific teams
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
  .then(result =>{
    console.log('GET specific team works', result.rows);
    res.send(result.rows);
  })
  .catch(error => {
    console.error('Error GET specific teams', error)
    res.sendStatus(500);
  })
 })
module.exports = router;