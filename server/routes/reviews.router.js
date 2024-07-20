const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET all reviews

router.get('/', (req, res) => {
  const queryText = `
    SELECT * 
    FROM "reviews"
    ORDER BY "id" ASC
  `;
  pool.query(queryText)
    .then((result) => {
      console.log('Review GET route works!', result.rows);
      res.send(result.rows);
    })
    .catch(error => {
      console.error('Error GET route for reviews ', error);
      res.sendStatus(500);
    });
});

router.get('/:team_id', (req, res) => {
  const { team_id } = req.params;
  const queryText = `
    SELECT * 
    FROM "reviews" 
    WHERE "team_id" = $1
  `;
  const queryValues = [team_id];

  pool.query(queryText, queryValues)
    .then((result) => {
      console.log('GET reviews for team works!', result.rows)
      res.status(200).json(result.rows); // Adjust response as needed
    })
    .catch(error => {
      console.error('Error fetching reviews:', error);
      res.sendStatus(500);
    });
});

// POST add review for a specific team
router.post('/:team_id', (req, res) => {
  const { date, user_id, team_id, rating, comments } = req.body;
  const queryText = `
   INSERT INTO reviews (date, user_id, team_id, rating, comments)
VALUES ($1,$2,$3,$4,$5)
  `;
  const queryValues = [date, user_id, team_id, rating, comments];

  pool.query(queryText, queryValues)
    .then((result) => {
      console.log('POST new review works', result.rows)
      res.status(201);
    })
    .catch(error => {
      console.error('Error adding review:', error);
      res.sendStatus(500);
    });
});
// PUT update review
router.put('/:review_id', (req, res) => {
  const { review_id } = req.params;
  const { date, user_id, team_id, rating, comments } = req.body;
  const queryText = `
    UPDATE "reviews"
    SET "date" = $1,
        "user_id" = $2,
        "team_id" = $3,
        "rating" = $4,
        "comments" = $5
    WHERE "id" = $6
  `;
  const queryValues = [date, user_id, team_id, rating, comments, review_id];

  pool.query(queryText, queryValues)
    .then((result) => {
      if (result.rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.status(200);
      }
    })
    .catch(error => {
      console.error('Error updating review:', error);
      res.sendStatus(500);
    });
});
// DELETE review
router.delete('/:review_id', (req, res) => {
  const { review_id } = req.params;
  const queryText = `
    DELETE FROM "reviews"
    WHERE "id" = $1
  `;
  const queryValues = [review_id];

  pool.query(queryText, queryValues)
    .then((result) => {
      if (result.rowCount === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch(error => {
      console.error('Error deleting review:', error);
      res.sendStatus(500);
    });
});

module.exports = router;