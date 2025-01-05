const connectMySQL = require('../config/mysql');

// Fetch all students and render Students Page
exports.getAllStudents = async (req, res) => {
    try {
        const db = await connectMySQL();
        const [rows] = await db.execute('SELECT * FROM student ORDER BY sid ASC'); // Order by student ID
        res.send(`
            <html>
                <head>
                    <title>Students Page</title>
                </head>
                <body>
                    <h1>Students</h1>
                    <a href="/">Home</a> | <a href="/students/add">Add Student</a>
                    <table border="1">
                        <tr>
                            <th>Student ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Actions</th>
                        </tr>
                        ${rows.map(student => `
                            <tr>
                                <td>${student.sid}</td>
                                <td>${student.name}</td>
                                <td>${student.age}</td>
                                <td>
                                    <a href="/students/edit/${student.sid}">Edit</a>
                                    <form action="/students/delete/${student.sid}" method="POST" style="display:inline;">
                                        <button type="submit">Delete</button>
                                    </form>
                                </td>
                            </tr>
                        `).join('')}
                    </table>
                </body>
            </html>
        `);
    } catch (err) {
        console.error('Error fetching students:', err.message);
        res.send(`
            <html>
                <body>
                    <h1>Error fetching students</h1>
                    <p>${err.message}</p>
                    <a href="/">Go Back to Home</a>
                </body>
            </html>
        `);
    }
};

// Render Add Student Page
exports.renderAddStudentPage = (req, res) => {
    const { error, sid, name, age } = req.query; // Collect validation error and pre-filled data
    res.send(`
        <html>
            <head><title>Add Student</title></head>
            <body>
                <h1>Add Student</h1>
                ${error ? `<p style="color: red;">${error}</p>` : ''}
                <form action="/students/add" method="POST">
                    <label>Student ID:</label>
                    <input type="text" name="sid" value="${sid || ''}" required><br>
                    <label>Name:</label>
                    <input type="text" name="name" value="${name || ''}" required><br>
                    <label>Age:</label>
                    <input type="number" name="age" value="${age || ''}" required><br>
                    <button type="submit">Add Student</button>
                </form>
                <a href="/students">Back to Students Page</a>
            </body>
        </html>
    `);
};

// Add a student with validation
exports.addStudentWithValidation = async (req, res) => {
    const { sid, name, age } = req.body;
    let error = '';

    // Validation
    if (sid.length !== 4) error = 'Student ID must be exactly 4 characters.';
    else if (name.length < 2) error = 'Name must have at least 2 characters.';
    else if (age < 18) error = 'Age must be 18 or older.';

    if (error) {
        return res.redirect(`/students/add?error=${encodeURIComponent(error)}&sid=${encodeURIComponent(sid)}&name=${encodeURIComponent(name)}&age=${encodeURIComponent(age)}`);
    }

    try {
        const db = await connectMySQL();
        await db.execute('INSERT INTO student (sid, name, age) VALUES (?, ?, ?)', [sid, name, age]);
        res.redirect('/students');
    } catch (err) {
        console.error('Error adding student:', err.message);
        res.send(`
            <html>
                <body>
                    <h1>Error Adding Student</h1>
                    <p>${err.message}</p>
                    <a href="/students/add">Go Back</a>
                </body>
            </html>
        `);
    }
};

// Render Update Student Page
exports.renderUpdateStudentPage = async (req, res) => {
    const { sid } = req.params;
    try {
        const db = await connectMySQL();
        const [rows] = await db.execute('SELECT * FROM student WHERE sid = ?', [sid]);
        if (rows.length === 0) {
            return res.send(`
                <html>
                    <body>
                        <h1>Error</h1>
                        <p>Student not found</p>
                        <a href="/students">Back to Students Page</a>
                    </body>
                </html>
            `);
        }
        const student = rows[0];
        res.send(`
            <html>
                <head><title>Update Student</title></head>
                <body>
                    <h1>Update Student</h1>
                    <form action="/students/edit/${student.sid}" method="POST">
                        <label>Student ID:</label>
                        <input type="text" name="sid" value="${student.sid}" readonly><br>
                        <label>Name:</label>
                        <input type="text" name="name" value="${student.name}" required><br>
                        <label>Age:</label>
                        <input type="number" name="age" value="${student.age}" required><br>
                        <button type="submit">Update Student</button>
                    </form>
                    <a href="/students">Back to Students Page</a>
                </body>
            </html>
        `);
    } catch (err) {
        console.error('Error rendering Update Student Page:', err.message);
        res.send(`
            <html>
                <body>
                    <h1>Error Rendering Update Page</h1>
                    <p>${err.message}</p>
                    <a href="/students">Back to Students Page</a>
                </body>
            </html>
        `);
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
            return res.send(`
                <html>
                    <body>
                        <h1>Error</h1>
                        <p>Student not found</p>
                        <a href="/students">Back to Students Page</a>
                    </body>
                </html>
            `);
        }
        res.redirect('/students');
    } catch (err) {
        console.error('Error updating student:', err.message);
        res.send(`
            <html>
                <body>
                    <h1>Error Updating Student</h1>
                    <p>${err.message}</p>
                    <a href="/students">Back to Students Page</a>
                </body>
            </html>
        `);
    }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
    const { sid } = req.params;
    try {
        const db = await connectMySQL();
        await db.execute('DELETE FROM grade WHERE sid = ?', [sid]); // Ensure grades are deleted first
        const [result] = await db.execute('DELETE FROM student WHERE sid = ?', [sid]);
        if (result.affectedRows === 0) {
            return res.send(`
                <html>
                    <body>
                        <h1>Error</h1>
                        <p>Student not found</p>
                        <a href="/students">Back to Students Page</a>
                    </body>
                </html>
            `);
        }
        res.redirect('/students');
    } catch (err) {
        console.error('Error deleting student:', err.message);
        res.send(`
            <html>
                <body>
                    <h1>Error Deleting Student</h1>
                    <p>${err.message}</p>
                    <a href="/students">Back to Students Page</a>
                </body>
            </html>
        `);
    }
};
