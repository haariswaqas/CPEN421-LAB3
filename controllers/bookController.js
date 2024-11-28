const { Book, Genre } = require('../models'); // Import models

// Retrieve all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll({
            include: [
                {
                    model: Genre,
                    attributes: ['name'], // Include genre name in the response
                },
            ],
        });
        res.json(books);
    } catch (error) {
        console.error('Error retrieving books:', error);
        res.status(500).json({ error: 'Error retrieving books' });
    }
};

// Retrieve a particular book by id
const getBook = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findByPk(id, {
            include: [
                {
                    model: Genre,
                    attributes: ['name'], // Include genre name in the response
                },
            ],
        });
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        console.error('Error retrieving book:', error);
        res.status(500).json({ error: 'Error retrieving book' });
    }
};

// Create a new book
const createBook = async (req, res) => {
    const { title, author, price, genre_id, copies_left, image, description } = req.body;

    try {
        // Check if book with same title and author already exists
        const existingBook = await Book.findOne({ 
            where: { 
                title,
                author 
            }
        });

        if (existingBook) {
            return res.status(400).json({ error: 'A book with this title and author already exists' });
        }

        const newBook = await Book.create({
            title,
            author,
            price,
            description,
            genre_id,
            copies_left,
            image
        });
        res.status(201).json(newBook);
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(400).json({ error: error.message || 'Error creating book' });
    }
};

// Update an existing book
const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, price, genre_id, copies_left, image, description } = req.body;

    try {
        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        if (title !== undefined) book.title = title;
        if (author !== undefined) book.author = author;
        if (price !== undefined) book.price = price;
        if (genre_id !== undefined) book.genre_id = genre_id;
        if (copies_left !== undefined) book.copies_left = copies_left;
        if (image !== undefined) book.image = image;
        if (description !== undefined) book.description = description;

        await book.save();
        res.json(book);
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(400).json({ error: error.message || 'Error updating book' });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        await book.destroy();
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Error deleting book' });
    }
};

module.exports = {
    getAllBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
};
