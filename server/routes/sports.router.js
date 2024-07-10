const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all sports
router.get('/', (req, res) => {
  const queryText = `
    SELECT * FROM "sports";
  `;
  pool.query(queryText)
    .then((result) => {
      console.log('All sports:', result.rows);
      comsole.log('GET route for sports works')
      res.send(result.rows);
    })
    .catch(error => {
      console.error('Error getting sports: ', error);
      res.sendStatus(500);
    });
});

// GET all single sports
router.get('/singlesports', (req, res) => {
  const queryText = `
    SELECT * FROM "sports"
    WHERE "sport_type" = 'single';
  `;
  pool.query(queryText)
    .then((result) => {
      console.log('The single sports are:', result.rows);
      res.send(result.rows);
    })
    .catch(error => {
      console.error('Error getting single sports: ', error);
      res.sendStatus(500);
    });
});

// GET all team sports
router.get('/teamsports', (req, res) => {
  const queryText = `
    SELECT * FROM "sports"
    WHERE "sport_type" = 'team';
  `;
  pool.query(queryText)
    .then((result) => {
      console.log('The team sports are:', result.rows);
      res.send(result.rows);
    })
    .catch(error => {
      console.error('Error getting team sports: ', error);
      res.sendStatus(500);
    });
});

// GET sport details by id
router.get('/:sport_name', (req, res) => {
  const { sport_name } = req.params;
  const queryText = `
    SELECT * FROM "sports" 
    WHERE "sport_name" = $1;
  `;
  const queryValues = [sport_name];

  pool.query(queryText, queryValues)
    .then((result) => {
      if (result.rows.length === 0) {
        res.sendStatus(404); // Sport not found
      } else {
        console.log('Selected Sport details:', result.rows);
        res.send(result.rows);
      }
    })
    .catch(error => {
      console.error('Error getting sport details:', error);
      res.sendStatus(500);
    });
});

// POST a new sport
router.post('/', (req, res) => {
  const { sport_name, sport_description, sport_type } = req.body;
  const queryText = `
    INSERT INTO "sports" ("sport_name", "sport_description", "sport_type")
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const queryValues = [sport_name, sport_description, sport_type];

  pool.query(queryText, queryValues)
    .then((result) => {
      res.send(result.rows[0]); // Send back newly created sport
    })
    .catch(error => {
      console.error('Error creating sport:', error);
      res.sendStatus(500);
    });
});

// Update a sport
router.put('/:id', (req, res) => {
  const { sportId } = req.params.id;
  const { sport_name, sport_description, sport_type } = req.body;

  // Validate input fields
  if (!sport_name || !sport_description || !sport_type) {
    return res.status(400);
  }

  const queryText = `
    UPDATE "sports"
    SET
      "sport_name" = $1,
      "sport_description" = $2,
      "sport_type" = $3
    WHERE
      "id" = $4
    RETURNING *;
  `;
  const queryValues = [sport_name, sport_description, sport_type, sportId];

  pool.query(queryText, queryValues)
    .then((result) => {
      if (result.rows.length === 0) {
        res.sendStatus(404); // Sport not found
      } else {
        res.send(result.rows[0]);
      }
    })
    .catch(error => {
      console.error('Error updating sport:', error);
      res.sendStatus(500);
    });
});

// DELETE a sport
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const queryText = `
    DELETE FROM "sports"
    WHERE "id" = $1
    RETURNING *;
  `;
  const queryValues = [id];

  pool.query(queryText, queryValues)
    .then((result) => {
      if (result.rows.length === 0) {
        res.sendStatus(404); 
      } else {
        res.sendStatus(200); 
      }
    })
    .catch(error => {
      console.error('Error deleting sport:', error);
      res.sendStatus(500);
    });
});

module.exports = router;