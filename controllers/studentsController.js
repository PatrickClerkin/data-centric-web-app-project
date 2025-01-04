const pool = require('../config/mysql');

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const [students] = await pool.query('SELECT * FROM student ORDER BY sid');
        res.json(students);
    } catch (err) {
        console.error('Error fetching students:', err.message);
        res.status(500).send('Error retrieving students');
    }
};

// Add a new student
exports.addStudent = async (req, res) => {
    const { sid, name, age } = req.body;
    try {
        await pool.query('INSERT INTO student (sid, name, age) VALUES (?, ?, ?)', [sid, name, age]);
        res.status(201).send('Student added successfully');
    } catch (err) {
        console.error('Error adding student:', err.message);
        res.status(500).send('Error adding student');
    }
};

// Update an existing students
exports.updateStudent = async (req, res) => {
    const { sid } = req.params;
    const { name, age } = req.body;
    try {
        const result = await pool.query('UPDATE student SET name = ?, age = ? WHERE sid = ?', [name, age, sid]);
        if (result[0].affectedRows === 0) {
            return res.status(404).send('Student not found');
        }
        res.send('Student updated successfully');
    } catch (err) {
        console.error('Error updating student:', err.message);
        res.status(500).send('Error updating student');
    }
};
