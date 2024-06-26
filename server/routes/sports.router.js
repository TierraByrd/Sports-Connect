const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET all sports
 */
router.get('/', (req, res) => {
  // GET route code here
  const queryText = 'SELECT * FROM sports';
  pool.query(queryText)
  .then((result) => res.send (result.rows))
  .catch((error) => {
    console.error('Error getting sports: ', error);
    res.sendStatus(500);
  });
});

/**
 * POST new sport
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;