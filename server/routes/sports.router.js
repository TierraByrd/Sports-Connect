const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET all sports
router.get('/', (req, res) => {
  // GET route for sports 
  const queryText = `
  SELECT * FROM "sports";
  `
  pool.query(queryText)
  .then((result) => {
    console.log('All sports:', result.rows)
    res.send(result.rows)
})
  .catch(error => {
    console.error('Error getting sports: ', error);
    res.sendStatus(500)
  })
});

// GET all single sports
router.get('/singlesports', (req, res) => {
  // GET route code here
  const queryText = `
  SELECT * FROM "sports"
  WHERE "sport_type" = 'single';
  `
  pool.query(queryText)
  .then((result) => {
    console.log('The single sports are:', result.rows);
    res.send(result.rows)
  })
  .catch(error => {
    console.error('Error getting single sports: ', error);
    res.sendStatus(500)
  });
});

//GET all team sports
router.get('/teamsports', (req, res) => {
  // GET route code here
  const queryText = `
  SELECT * FROM "sports"
  WHERE "sport_type" = 'team';
  `
  pool.query(queryText)
  .then((result) => {
    console.log('The team sports are:', result.rows);
    res.send(result.rows)
  })
  .catch(error => {
    console.error('Error getting team sports: ', error);
    res.sendStatus(500)
  });
});
//GET sport details by name
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const queryText = `
  SELECT * FROM "sports" 
  WHERE "sport_name" = $1;
  `
  const queryValues = [id];
  
  pool.query(queryText, queryValues)
    .then((result) => {
      console.log('Selected Sport details are:', result.rows);
       res.send(result.rows)
})
    .catch(error => {
      console.error('Error getting sport details:', error);
      res.sendStatus(500)
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
    res.send(result.rows)
  })
  .catch(error => {
    console.error('Error getting sport details:', error);
    res.sendStatus(500)
  });
});


// Update a sport
router.put('/:id', (req, res) => {
  const {id} = req.params;
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

  const queryValues = [sport_name, sport_description, sport_type, id];

  pool.query(queryText, queryValues)
    .then((result) => {
      res.send(200);
    })
    .catch(error => {
      console.error('Error updating sport:', error);
      res.sendStatus(500);
    });
});


// DELETE a sport
router.delete('/:id', (req, res) => {
  const {id} = req.params;
  const queryText = `
    DELETE FROM "sports"
    WHERE "id" = $1
    RETURNING *;
  `;
  const queryValues = [id];

  pool.query(queryText, queryValues)
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200);
      } else {
        res.status(404)
      }
    })
    .catch(error => {
      console.error('Error deleting sport:', error);
      res.sendStatus(500)
    });
});


module.exports = router;