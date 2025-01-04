const connectMySQL = require('../config/mysql');

// Update a grade
exports.updateGrade = async (req, res) => {
    const { sid, mid } = req.params;
    const { grade } = req.body;
    try {
        const db = await connectMySQL();
        const [result] = await db.execute('UPDATE grade SET grade = ? WHERE sid = ? AND mid = ?', [grade, sid, mid]);
        if (result.affectedRows === 0) {
            return res.status(404).send('Grade not found');
        }
        res.send('Grade updated successfully');
    } catch (err) {
        console.error('Error updating grade:', err.message);
        res.status(500).send('Error updating grade');
    }
};

// Delete a grade
exports.deleteGrade = async (req, res) => {
    const { sid, mid } = req.params;
    try {
        const db = await connectMySQL();
        const [result] = await db.execute('DELETE FROM grade WHERE sid = ? AND mid = ?', [sid, mid]);
        if (result.affectedRows === 0) {
            return res.status(404).send('Grade not found');
        }
        res.send('Grade deleted successfully');
    } catch (err) {
        console.error('Error deleting grade:', err.message);
        res.status(500).send('Error deleting grade');
    }
};
