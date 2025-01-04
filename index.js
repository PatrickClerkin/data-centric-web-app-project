const express = require('express');
const mysql = require('./config/mysql'); // MySQL connection pool
const studentsRoutes = require('./routes/students'); // Students route

const app = express();

// Middleware
app.use(express.json());

// Test database connection
app.get('/test-db', async (req, res) => {
    try {
        const [rows] = await mysql.query('SELECT 1');
        res.send('Database connection successful!');
    } catch (err) {
        console.error('Database connection failed:', err);
        res.status(500).send('Database connection failed');
    }
});

// Connect the /students route
app.use('/students', studentsRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Data-Centric Web App</h1><a href="/students">Go to Students</a>');
});

// Start the server
const PORT = 3004;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
