const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();




// GET all sports
router.get('/', (req, res) => {
  // GET route code here
  const queryText = `SELECT * FROM "sports";`
  pool.query(queryText)
  .then((results) => res.send (results.rows))
  .catch((error) => {
    console.error('Error getting sports: ', error);
    res.sendStatus(500);
  });
});

// GET all single sports
router.get('/singlesports', (req, res) => {
  // GET route code here
  const queryText = `SELECT * FROM "sports"
  WHERE sport_type = 'single';`
  pool.query(queryText)
  .then((results) => res.send (results.rows))
  .catch((error) => {
    console.error('Error getting single sports: ', error);
    res.sendStatus(500);
  });
});

//GET all team sports
router.get('/teamsports', (req, res) => {
  //GET route
  const queryText = `
  SELECT * FROM sports 
  WHERE sport_type = 'team'
  `
  pool.query(queryText)
  .then((results) => res.send (results.rows))
  .catch((error) => {
    console.error('Error getting team sports: ', error);
    res.sendStatus(500);
  });
});
//GET sport details by name
router.get('/:sport_name', (req, res) => {
  const { sport_name } = req.params;
  const queryText = `SELECT * FROM "sports" WHERE sport_name = $1;`;
  const queryValues = [sport_name];
  
  pool.query(queryText, queryValues)
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.error('Error getting sport details:', error);
      res.sendStatus(500);
    });
});
module.exports = router;