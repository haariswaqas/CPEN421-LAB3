const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors package
const sequelize = require('./database');
const bookRoutes = require('./routes/bookRoutes');
const genreRoutes = require('./routes/genreRoutes'); // Import genreRoutes

dotenv.config();

const app = express();

// Enable CORS for requests from http://localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));

// Middleware
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Routes
app.use('/api', bookRoutes);
app.use('/api', genreRoutes); // Add genre routes

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

const PORT = process.env.PORT || 3001;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully');
        
        await sequelize.sync();
        console.log('Database models synchronized');
        
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to start server:', error);
        process.exit(1);
    }
};

startServer();