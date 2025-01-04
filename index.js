const express = require('express');
const mysql = require('./config/mysql');

const app = express();
app.use(express.json());

// Test MySQL Connection
app.get('/test-db', async (req, res) => {
    try {
        const [rows] = await mysql.query('SELECT * FROM student');
        res.json(rows);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Database error');
    }
});

// Start the server
const PORT = 3004;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
