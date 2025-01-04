const connectMySQL = require('../config/mysql');

// Fetch all students
exports.getAllStudents = async (req, res) => {
    try {
        const db = await connectMySQL();
        const [rows] = await db.execute('SELECT * FROM student');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching students:', err.message);
        res.status(500).send('Error retrieving students');
    }
};

// Add a student
exports.addStudent = async (req, res) => {
    const { sid, name, age } = req.body;
    try {
        const db = await connectMySQL();
        await db.execute('INSERT INTO student (sid, name, age) VALUES (?, ?, ?)', [sid, name, age]);
        res.status(201).send('Student added successfully');
    } catch (err) {
        console.error('Error adding student:', err.message);
        res.status(500).send('Error adding student');
    }
};

// Update a student
exports.updateStudent = async (req, res) => {
    const { sid } = req.params;
    const { name, age } = req.body;
    try {
        const db = await connectMySQL();
        const [result] = await db.execute('UPDATE student SET name = ?, age = ? WHERE sid = ?', [name, age, sid]);
        if (result.affectedRows === 0) {
            return res.status(404).send('Student not found');
        }
        res.send('Student updated successfully');
    } catch (err) {
        console.error('Error updating student:', err.message);
        res.status(500).send('Error updating student');
    }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
    const { sid } = req.params;
    try {
        const db = await connectMySQL();
       
        await db.execute('DELETE FROM grade WHERE sid = ?', [sid]);
      
        const [result] = await db.execute('DELETE FROM student WHERE sid = ?', [sid]);
        if (result.affectedRows === 0) {
            return res.status(404).send('Student not found');
        }
        res.send('Student and associated grades deleted successfully');
    } catch (err) {
        console.error('Error deleting student:', err.message);
        res.status(500).send('Error deleting student');
    }
};
