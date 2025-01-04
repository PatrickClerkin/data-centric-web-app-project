const pool = require('../config/mysql');

// Fetch all grades
exports.getAllGrades = async (req, res) => {
    try {
        const [grades] = await pool.query('SELECT * FROM grade');
        res.json(grades); // Return grades as JSON
    } catch (err) {
        console.error('Error fetching grades:', err.message);
        res.status(500).send('Error retrieving grades');
    }
};

// Add a new grade
exports.addGrade = async (req, res) => {
    const { sid, mid, grade } = req.body;
    try {
        await pool.query('INSERT INTO grade (sid, mid, grade) VALUES (?, ?, ?)', [sid, mid, grade]);
        res.status(201).send('Grade added successfully');
    } catch (err) {
        console.error('Error adding grade:', err.message);
        res.status(500).send('Error adding grade');
    }
};

// Update an existing grade
exports.updateGrade = async (req, res) => {
    const { sid, mid, grade } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE grade SET grade = ? WHERE sid = ? AND mid = ?',
            [grade, sid, mid]
        );
        if (result.affectedRows === 0) {
            return res.status(404).send('Grade not found');
        }
        res.send('Grade updated successfully');
    } catch (err) {
        console.error('Error updating grade:', err.message);
        res.status(500).send('Error updating grade');
    }
};
