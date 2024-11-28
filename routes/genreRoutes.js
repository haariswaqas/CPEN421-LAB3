const express = require('express');
const genreController = require('../controllers/genreController');

const router = express.Router();

// Genre Routes

// Genre Routes
router.get('/genres', genreController.getAllGenres); // Get all genres
router.get('/genres/:id', genreController.getGenre); // Get a specific genre by ID
router.post('/genres', genreController.createGenre); // Create a new genre
router.put('/genres/:id', genreController.updateGenre); // Update a genre
router.delete('/genres/:id', genreController.deleteGenre); // Delete a genre

module.exports = router;