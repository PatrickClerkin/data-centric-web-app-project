const pool = require('../config/mysql');

// Fetch all modules
exports.getAllModules = async (req, res) => {
    try {
        const [modules] = await pool.query('SELECT * FROM module ORDER BY mid');
        res.json(modules); // Return modules as JSON
    } catch (err) {
        console.error('Error fetching modules:', err.message);
        res.status(500).send('Error retrieving modules');
    }
};

// Add a new module
exports.addModule = async (req, res) => {
    const { mid, name, credits, lecturer } = req.body;
    try {
        await pool.query(
            'INSERT INTO module (mid, name, credits, lecturer) VALUES (?, ?, ?, ?)',
            [mid, name, credits, lecturer]
        );
        res.status(201).send('Module added successfully');
    } catch (err) {
        console.error('Error adding module:', err.message);
        res.status(500).send('Error adding module');
    }
};

// Update an existing module
exports.updateModule = async (req, res) => {
    const { mid } = req.params;
    const { name, credits, lecturer } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE module SET name = ?, credits = ?, lecturer = ? WHERE mid = ?',
            [name, credits, lecturer, mid]
        );
        if (result.affectedRows === 0) {
            return res.status(404).send('Module not found');
        }
        res.send('Module updated successfully');
    } catch (err) {
        console.error('Error updating module:', err.message);
        res.status(500).send('Error updating module');
    }
};
