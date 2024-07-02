const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all reviews
router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM reviews';
    pool.query(queryText)
      .then((result) => res.send(result.rows))
      .catch((error) => {
        console.error('Error getting comments:', error);
        res.sendStatus(500);
      });
  });
  
  // POST new review
  router.post('/', (req, res) => {
    const { date, team_id, rating, reviews, user_id } = req.body;
    const queryText = 'INSERT INTO reviews (date, team_id, rating, reviews, user_id) VALUES ($1, $2, $3, $4, $5)';
    pool.query(queryText, [date, team_id, rating, reviews, user_id])
      .then(() => res.sendStatus(201))
      .catch((error) => {
        console.error('Error adding comment:', error);
        res.sendStatus(500);
      });
  });
  
  // PUT update review by ID
  router.put('/:id', (req, res) => {
    const reviewId = req.params.id;
    const { date, team_id, rating, reviewws, user_id } = req.body;
    const queryText = 'UPDATE reviews SET date = $1, team_id = $2, rating = $3, comments = $4, user_id = $5 WHERE id = $6';
    pool.query(queryText, [date, team_id, rating, s, user_id, reviewId])
      .then(() => res.sendStatus(200))
      .catch((error) => {
        console.error('Error updating review:', error);
        res.sendStatus(500);
      });
  });
  
  // DELETE review by ID
  router.delete('/:id', (req, res) => {
    const reviewId = req.params.id;
    const queryText = 'DELETE FROM reviews WHERE id = $1';
    pool.query(queryText, [reviewId])
      .then(() => res.sendStatus(204))
      .catch((error) => {
        console.error('Error deleting review:', error);
        res.sendStatus(500);
      });
  });

module.exports = router;