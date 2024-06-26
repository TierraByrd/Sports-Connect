const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET all locations
 */
router.get('/', (req, res) => {
  // GET route code here
  const queryText = 'SELECT * FROM locations';
  pool.query(queryText)
  .then((result) => res.send(result.rows))
  .catch((error) => {
    console.error('Error getting locations:', error);
    res.sendStatus(500);
  });
});

/**
 * POST new location
 */
router.post('/', (req, res) => {
  // POST route code here
  const {city,state,zip} = req.body;
  const queryText = 'INSERT INTO location (city, state, zip) VALUES ($1, $2, $3)';
  pool.query(queryText, [city,state,zip])
  .then(() => res.sendStatus(201))
  .catch((error) => {
    console.error('Error adding location: ', error);
    res.sendStatus(500);
  });
});

// PUT update location by ID
router.put('/:id', (req, res) => {
    const locationId = req.params.id;
    const { city, state, zip } = req.body;
    const queryText = 'UPDATE locations SET city = $1, state = $2, zip = $3 WHERE id = $4';
    pool.query(queryText, [city, state, zip, locationId])
      .then(() => res.sendStatus(200))
      .catch((err) => {
        console.error('Error updating location:', err);
        res.sendStatus(500);
      });
  });
// DELETE location by ID
router.delete('/:id', (req, res) => {
    const locationId = req.params.id;
    const queryText = 'DELETE FROM locations WHERE id = $1';
    pool.query(queryText, [locationId])
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.error('Error deleting location:', err);
        res.sendStatus(500);
      });
  });
module.exports = router;
