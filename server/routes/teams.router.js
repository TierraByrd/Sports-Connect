const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all teams
router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM teams';
    pool.query(queryText)
      .then((result) => res.send(result.rows))
      .catch((err) => {
        console.error('Error getting teams:', err);
        res.sendStatus(500);
      });
  });
  
  // POST new team
  router.post('/', (req, res) => {
    const { zip, sport_id, team_name, location_id } = req.body;
    const queryText = 'INSERT INTO teams (zip, sport_id, team_name, location_id) VALUES ($1, $2, $3, $4)';
    pool.query(queryText, [zip, sport_id, team_name, location_id])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.error('Error adding team:', err);
        res.sendStatus(500);
      });
  });
  
  // PUT update team by ID
  router.put('/:id', (req, res) => {
    const teamId = req.params.id;
    const { zip, sport_id, team_name, location_id } = req.body;
    const queryText = 'UPDATE teams SET zip = $1, sport_id = $2, team_name = $3, location_id = $4 WHERE id = $5';
    pool.query(queryText, [zip, sport_id, team_name, location_id, teamId])
      .then(() => res.sendStatus(200))
      .catch((err) => {
        console.error('Error updating team:', err);
        res.sendStatus(500);
      });
  });
  
  // DELETE team by ID
  router.delete('/:id', (req, res) => {
    const teamId = req.params.id;
    const queryText = 'DELETE FROM teams WHERE id = $1';
    pool.query(queryText, [teamId])
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.error('Error deleting team:', err);
        res.sendStatus(500);
      });
  });

module.exports = router;