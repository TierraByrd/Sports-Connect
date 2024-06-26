const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all comments
router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM comments';
    pool.query(queryText)
      .then((result) => res.send(result.rows))
      .catch((err) => {
        console.error('Error getting comments:', err);
        res.sendStatus(500);
      });
  });
  
  // POST new comment
  router.post('/', (req, res) => {
    const { date, team_id, rating, comments, user_id } = req.body;
    const queryText = 'INSERT INTO comments (date, team_id, rating, comments, user_id) VALUES ($1, $2, $3, $4, $5)';
    pool.query(queryText, [date, team_id, rating, comments, user_id])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.error('Error adding comment:', err);
        res.sendStatus(500);
      });
  });
  
  // PUT update comment by ID
  router.put('/:id', (req, res) => {
    const commentId = req.params.id;
    const { date, team_id, rating, comments, user_id } = req.body;
    const queryText = 'UPDATE comments SET date = $1, team_id = $2, rating = $3, comments = $4, user_id = $5 WHERE id = $6';
    pool.query(queryText, [date, team_id, rating, comments, user_id, commentId])
      .then(() => res.sendStatus(200))
      .catch((err) => {
        console.error('Error updating comment:', err);
        res.sendStatus(500);
      });
  });
  
  // DELETE comment by ID
  router.delete('/:id', (req, res) => {
    const commentId = req.params.id;
    const queryText = 'DELETE FROM comments WHERE id = $1';
    pool.query(queryText, [commentId])
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.error('Error deleting comment:', err);
        res.sendStatus(500);
      });
  });

module.exports = router;