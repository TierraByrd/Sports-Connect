const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// POST new like
router.post('/', (req, res) => {
    const { user_id, comment_id } = req.body;
    const queryText = 'INSERT INTO likes (user_id, comment_id) VALUES ($1, $2)';
    pool.query(queryText, [user_id, comment_id])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.error('Error adding like:', err);
        res.sendStatus(500);
      });
  });
  
  // DELETE like by ID
  router.delete('/:id', (req, res) => {
    const likeId = req.params.id;
    const queryText = 'DELETE FROM likes WHERE id = $1';
    pool.query(queryText, [likeId])
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.error('Error deleting like:', err);
        res.sendStatus(500);
      });
  });
  
  module.exports = router;
module.exports = router;