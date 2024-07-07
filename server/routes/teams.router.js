const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all teams
router.get('/', (req, res) => {
  const queryText = `
  SELECT * 
  FROM "teams";
  `;
  pool.query(queryText)
    .then((result) => {
      console.log('All teams:', result.rows);
      res.send(result.rows);
    })
    .catch(error => {
      console.error('Error getting teams:', error);
      res.sendStatus(500);
    });
});

// GET teams by sport_name
router.get('/api/:sport_name/teams', (req, res) => {
  const { sport_name } = req.params;
  const queryText = `
SELECT 
    teams.id,
    teams.sport_id,
    teams.team_name,
    sports.id AS sport_id,
    sports.sport_name,
    teams.coach_name,
    teams.contact_info,
    teams.current_rating
FROM 
    teams
JOIN 
    sports ON teams.sport_id = sports.id
WHERE 
    sports.sport_name = $1;
  `
  ;
  const queryValues = [sport_name];
  

  pool.query(queryText, queryValues)
    .then((result) => {
      console.log('Teams associated with this sport:', result.rows);
      res.send(result.rows);
    })
    .catch(error => {
      console.error('Error fetching teams:', error);
      res.sendStatus(500);
    });
});

// POST new team
router.post('/teams', (req, res) => {
  const { zip, sport_id, team_name, location_id } = req.body;
  const queryText = `
    INSERT INTO "teams" ("zip", "sport_id", "team_name", "location_id") 
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const queryValues = [zip, sport_id, team_name, location_id];

  pool.query(queryText, queryValues)
    .then((result) => {
      console.log('New team added:', result.rows);
      res.status(201).send(result.rows);
    })
    .catch(error => {
      console.error('Error adding team:', error);
      res.sendStatus(500);
    });
});

// PUT update team by id
router.put('/teams/:id', (req, res) => {
  const { id } = req.params;
  const { zip, sport_id, team_name, location_id } = req.body;

  const queryText = `
    UPDATE "teams" 
    SET "zip" = $1, "sport_id" = $2, "team_name" = $3, "location_id" = $4 
    WHERE "id" = $5
    RETURNING *;
  `;
  const queryValues = [zip, sport_id, team_name, location_id, id];

  pool.query(queryText, queryValues)
    .then((result) => {
      console.log('Updated Team info:', result.rows);
      res.status(200).send(result.rows);
    })
    .catch(error => {
      console.error('Error updating team:', error);
      res.sendStatus(500);
    });
});

// DELETE team by id
router.delete('/teams/:id', (req, res) => {
  const { id } = req.params;
  const queryText = `
    DELETE FROM "teams" 
    WHERE id = $1
    RETURNING *;
  `;
  const queryValues = [id];

  pool.query(queryText, queryValues)
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).send(result.rows[0]); // Send the deleted team as response
      } else {
        res.status(404).send('Team not found'); // If no team was deleted
      }
    })
    .catch(error => {
      console.error('Error deleting team:', error);
      res.sendStatus(500);
    });
});

module.exports = router;