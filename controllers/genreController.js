const { Genre } = require('../models'); // Import models

// Retrieve all genres
const getAllGenres = async (req, res) => {
    try {
        const genres = await Genre.findAll();
        res.json(genres);
    } catch (error) {
        console.error('Error retrieving genres:', error);
        res.status(500).json({ error: 'Error retrieving genres' });
    }
};

// Retrieve a particular genre by id
const getGenre = async (req, res) => {
    const { id } = req.params;

    try {
        const genre = await Genre.findByPk(id);
        if (!genre) {
            return res.status(404).json({ error: 'Genre not found' });
        }
        res.json(genre);
    } catch (error) {
        console.error('Error retrieving genre:', error);
        res.status(500).json({ error: 'Error retrieving genre' });
    }
};

// Create a new genre
const createGenre = async (req, res) => {
    const { name } = req.body;

    try {
        // Check if genre with same name already exists
        const existingGenre = await Genre.findOne({ where: { name } });
        if (existingGenre) {
            return res.status(400).json({ error: 'A genre with this name already exists' });
        }

        const newGenre = await Genre.create({ name });
        res.status(201).json(newGenre);
    } catch (error) {
        console.error('Error creating genre:', error);
        res.status(400).json({ error: error.message || 'Error creating genre' });
    }
};

// Update an existing genre
const updateGenre = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const genre = await Genre.findByPk(id);
        if (!genre) {
            return res.status(404).json({ error: 'Genre not found' });
        }

        if (name !== undefined) genre.name = name;

        await genre.save();
        res.json(genre);
    } catch (error) {
        console.error('Error updating genre:', error);
        res.status(400).json({ error: error.message || 'Error updating genre' });
    }
};

// Delete a genre
const deleteGenre = async (req, res) => {
    const { id } = req.params;

    try {
        const genre = await Genre.findByPk(id);
        if (!genre) {
            return res.status(404).json({ error: 'Genre not found' });
        }

        await genre.destroy();
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting genre:', error);
        res.status(500).json({ error: 'Error deleting genre' });
    }
};

module.exports = {
    getAllGenres,
    getGenre,
    createGenre,
    updateGenre,
    deleteGenre,
};
