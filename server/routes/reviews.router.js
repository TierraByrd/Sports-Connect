const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET all reviews

router.get('/', (req, res) => {
  const queryText = `
    SELECT * FROM "reviews";
  `;
  pool.query(queryText)
    .then((result) => {
      console.log('Reviews:', result.rows);
      res.send(result.rows);
    })
    .catch(error => {
      console.error('Error getting reviews: ', error);
      res.sendStatus(500);
    });
});

// GET review  by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const queryText = `
    SELECT * FROM "review" 
    WHERE "sport"."id" = $1;
  `;
  const queryValues = [id];

  pool.query(queryText, queryValues)
    .then((result) => {
      if (result.rows.length === 0) {
        res.sendStatus(404); // No review found
      } else {
        console.log('Selected Team Review:', result.rows);
        res.send(result.rows);
      }
    })
    .catch(error => {
      console.error('Error getting reviews:', error);
      res.sendStatus(500);
    });
});

// POST a new sport
router.post('/', (req, res) => {
  const {rating, comments } = req.body;
  const queryText = `
    INSERT INTO "reviews" ("rating", "comments")
    VALUES ($1, $2)
    RETURNING *;
  `;
  const queryValues = [rating, comments];

  pool.query(queryText, queryValues)
    .then((result) => {
      res.send(result.rows) 
    })
    .catch(error => {
      console.error('Error creating sport:', error);
      res.sendStatus(500);
    });
});

// Update a review
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { rating, comments } = req.body;

  // Validate input fields
  if (!rating || !comments) {
    return res.status(400);
  }

const queryText = `
  UPDATE "reviews"
  SET
    "rating" = $1,
    "comments" = $2
  WHERE
    "id" = $3
`;
  const queryValues = [rating, comments, id];

  pool.query(queryText, queryValues)
    .then((result) => {
      if (result.rows.length === 0) {
        res.sendStatus(404); // Sport not found
      } else {
        res.send(result.rows[0]);
      }
    })
    .catch(error => {
      console.error('Error updating review:', error);
      res.sendStatus(500);
    });
});

// DELETE a sport
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const queryText = `
    DELETE FROM "reviews"
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
      console.error('Error deleting review:', error);
      res.sendStatus(500);
    });
});

module.exports = router;