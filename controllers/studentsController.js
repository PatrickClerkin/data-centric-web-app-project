const pool = require('../config/mysql');

exports.getAllStudents = async (req, res) => {
    try {
        const [students] = await pool.query('SELECT * FROM student ORDER BY sid');
        res.json(students); // Send JSON data
    } catch (err) {
        console.error('Error fetching students:', err.message);
        res.status(500).send('Error retrieving students');
    }
};
