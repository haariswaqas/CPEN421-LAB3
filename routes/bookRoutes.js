const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

// Book Routes
router.get('/books', bookController.getAllBooks); // Get all books
router.get('/books/:id', bookController.getBook); // Get a specific book by ID
router.post('/books', bookController.createBook); // Create a new book
router.put('/books/:id', bookController.updateBook); // Update a book
router.delete('/books/:id', bookController.deleteBook); // Delete a book

module.exports = router;
