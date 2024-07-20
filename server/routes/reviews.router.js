const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET all reviews
router.get('/', (req, res) => {
    const queryText = `
    SELECT * 
    FROM reviews`
    ;
    pool.query(queryText)
      .then(result => {
        console.log('Reviews GET route works!', result.rows);
        res.send(result.rows)
  })
      .catch((error) => {
        console.error('Error getting reviews', error);
        res.sendStatus(500);
      });
  });
  //GET reviews for specific teams
  router.get('/:team_name', (req, res) => {
    const team_name  = req.params.team_name;
    const queryText = `
    SELECT reviews.*
    FROM reviews
    JOIN teams ON reviews.team_id = teams.id
    WHERE teams.team_name = $1
    `;
    const queryValues = [team_name];
    pool.query(queryText, queryValues)
    .then(result => {
      console.log('GET specific reviews work', result.rows)
      res.send(result.rows);
    })
    .catch(error =>{
      console.error("Error Get specific reviews", error)
      res.sendStatus(500);
    })
  })
  // POST new review
  router.post('/', (req, res) => {
    const { date, team_id, rating, comments} = req.body;
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
    const { date, team_id, rating, comments } = req.body;
    const queryText = 'UPDATE reviews SET date = $1, team_id = $2, rating = $3, comments = $4 WHERE id = $5';
    pool.query(queryText, [date, team_id, rating, comments, reviewId])
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