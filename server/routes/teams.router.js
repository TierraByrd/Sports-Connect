const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all teams
router.get('/', (req, res) => {
  //GET route for teams
    const queryText = `
    SELECT * FROM "teams";
    `
    pool.query(queryText)
      .then((result) => {
        console.log('All teams:', result.rows)
        res.send(result.rows)
      })
      .catch(error => {
        console.error('Error getting teams:', error);
        res.sendStatus(500);
      });
  });
  // GET teams by sport_name
router.get(`/${sport_name}/teams`, (req, res) => {
  const {sport_name} = req.params;
  const queryText = `
  SELECT "teams"."id", "teams"."team_name", "teams"."coach_name", "teams"."contact_info", "teams".
  "current_rating"
  FROM "teams"
  JOIN "sports" 
  ON "teams"."sports.id" = "sports.id"
  WHERE "sports"."sport_name" = $1;
  `;
  
  const queryValues = [sport_name];

  pool.query(queryText, queryValues)
    .then((result) => {
      res.send(result.rows)
    })
    .catch(error => {
      console.error('Error getting teams:', error);
      res.sendStatus(500);
    });
});
  // POST new team
  router.post('/', (req, res) => {
    const { zip, sport_id, team_name, location_id } = req.body;
    const queryText = `
    INSERT INTO "teams" ("zip", "sport_id", "team_name", "location_id") 
    VALUES ($1, $2, $3, $4)`

    const queryValues = [zip, sport_id, team_name, location_id];

    pool.query(queryText, queryValues)
      .then((result) => {
        console.log('New team added: ', result.rows)
      res.sendStatus(201)
    })
      .catch(error => {
        console.error('Error adding team:', error);
        res.sendStatus(500);
      });
  });
  
  // update team by id
  router.put('/:id', (req, res) => {
    const {id} = req.params.id;
    const { zip, sport_id, team_name, location_id } = req.body;

    //validate input fields
    if (!zip || !sport_id || !team_name || !location_id) {
      return res.sendStatus(400);
    }
    const queryText = `
    UPDATE "teams" 
    SET "zip" = $1, "sport_id "= $2, "team_name" = $3, "location_id" = $4 
    WHERE "id" = $5;
    `;
    const queryValues = [zip, sport_id, team_name, location_id, id]

    pool.query(queryText, queryValues)
      .then((result) => {
        res.send(200)
      })
      .catch(error => {
        console.error('Error updating team:', error);
        res.sendStatus(500);
      });
  });
  
  // DELETE team by ID
  router.delete('/:id', (req, res) => {
    const {id} = req.params;
    const queryText = `
    DELETE FROM "teams" 
    WHERE id = $1;
    RETURNING *;
    `;
    const queryValues = [id]
    pool.query(queryText, queryValues)
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200);
      } else {
        res.status(404)
      }
    })
    .catch(error => {
      console.error('Error deleting team:', error);
      res.sendStatus(500)
    });
});

module.exports = router;