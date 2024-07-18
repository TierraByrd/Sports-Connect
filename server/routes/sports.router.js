const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all sports
router.get('/', (req, res) => {
  const queryText = `
    SELECT * FROM "sports"
    ORDER BY "id" ASC
  `;
  pool.query(queryText)
    .then((result) => {
      console.log('All sports:', result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.error('Error getting sports: ', error);
      res.sendStatus(500);
    });
});

// GET all sports of a specific type (team or single)
router.get('/:sport_type', (req, res) => {
  const { sport_type } = req.params;
  const queryText = `
    SELECT * FROM "sports"
    WHERE "sport_type" = $1
    ORDER BY "id" ASC
  `;
  const queryValues = [sport_type];

  pool.query(queryText, queryValues)
    .then(result => {
      console.log(` ${sport_type} details:`, result.rows);
      res.send(result.rows);
    })
    .catch(error => {
      console.error(`Error getting sports for ${sport_type}: `, error);
      res.sendStatus(500);
    });
});

module.exports = router;