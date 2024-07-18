const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all teams
router.get('/', (req, res) => {
  const queryText = `
    SELECT * 
    FROM "teams"
    ORDER BY "id" ASC
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
 router.get('/:team_name', (req, res) => {
  const {team_name} = req.params;
  const queryText = `
  SELECT * 
  FROM "teams"
  WHERE "team_name" = $1
  ORDER By "id" ASC
  `;
  const queryValues = [team_name];
  
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