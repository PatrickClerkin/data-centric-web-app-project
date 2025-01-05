const connectMySQL = require('../config/mysql');

// Fetch all grades
exports.getAllGrades = async (req, res) => {
    try {
        const db = await connectMySQL();
        const [rows] = await db.execute(`
            SELECT g.sid, g.mid, g.grade, s.name AS student_name, m.name AS module_name 
            FROM grade g 
            JOIN student s ON g.sid = s.sid 
            JOIN module m ON g.mid = m.mid
        `);
        res.send(`
            <html>
                <head><title>Grades</title></head>
                <body>
                    <h1>Grades</h1>
                    <table border="1">
                        <tr>
                            <th>Student ID</th>
                            <th>Student Name</th>
                            <th>Module ID</th>
                            <th>Module Name</th>
                            <th>Grade</th>
                            <th>Actions</th>
                        </tr>
                        ${rows.map(row => `
                            <tr>
                                <td>${row.sid}</td>
                                <td>${row.student_name}</td>
                                <td>${row.mid}</td>
                                <td>${row.module_name}</td>
                                <td>${row.grade}</td>
                                <td>
                                    <a href="/grades/edit/${row.sid}/${row.mid}">Edit</a>
                                </td>
                            </tr>
                        `).join('')}
                    </table>
                    <br><a href="/">Back to Home Page</a>
                </body>
            </html>
        `);
    } catch (err) {
        console.error('Error fetching grades:', err.message);
        res.status(500).send('Error retrieving grades');
    }
};

// Render Edit Grade Page
exports.renderEditGradePage = async (req, res) => {
    const { sid, mid } = req.params;
    try {
        const db = await connectMySQL();
        const [rows] = await db.execute(`
            SELECT g.sid, g.mid, g.grade, s.name AS student_name, m.name AS module_name 
            FROM grade g 
            JOIN student s ON g.sid = s.sid 
            JOIN module m ON g.mid = m.mid 
            WHERE g.sid = ? AND g.mid = ?
        `, [sid, mid]);

        if (rows.length === 0) {
            return res.status(404).send('Grade not found');
        }

        const grade = rows[0];
        res.send(`
            <html>
                <head><title>Edit Grade</title></head>
                <body>
                    <h1>Edit Grade</h1>
                    <form action="/grades/edit/${sid}/${mid}" method="POST">
                        <p>Student: ${grade.student_name} (${grade.sid})</p>
                        <p>Module: ${grade.module_name} (${grade.mid})</p>
                        <label>Grade:</label>
                        <input type="number" name="grade" value="${grade.grade}" required>
                        <br><br>
                        <button type="submit">Update Grade</button>
                    </form>
                    <br><a href="/grades">Back to Grades Page</a>
                </body>
            </html>
        `);
    } catch (err) {
        console.error('Error rendering edit grade page:', err.message);
        res.status(500).send('Error rendering edit grade page');
    }
};

// Update a grade with validation
exports.updateGradeWithValidation = async (req, res) => {
    const { sid, mid } = req.params;
    const { grade } = req.body;

    if (grade < 0 || grade > 100) {
        return res.redirect(`/grades/edit/${sid}/${mid}?error=Grade must be between 0 and 100&grade=${grade}`);
    }

    try {
        const db = await connectMySQL();
        const [result] = await db.execute('UPDATE grade SET grade = ? WHERE sid = ? AND mid = ?', [grade, sid, mid]);

        if (result.affectedRows === 0) {
            return res.status(404).send('Grade not found');
        }

        res.redirect('/grades');
    } catch (err) {
        console.error('Error updating grade:', err.message);
        res.status(500).send('Error updating grade');
    }
};
