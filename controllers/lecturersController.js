const connectMongo = require('../config/mongo');
const connectMySQL = require('../config/mysql');

// Fetch all lecturers
exports.getAllLecturers = async (req, res) => {
    try {
        const db = await connectMongo();
        const lecturers = await db.collection('lecturers').find().toArray();
        res.send(`
            <html>
                <head><title>Lecturers</title></head>
                <body>
                    <h1>Lecturers</h1>
                    <a href="/">Home</a> | <a href="/lecturers/add">Add Lecturer</a>
                    <table border="1">
                        <tr>
                            <th>Lecturer ID</th>
                            <th>Name</th>
                            <th>Department ID</th>
                            <th>Actions</th>
                        </tr>
                        ${lecturers.map(lecturer => `
                            <tr>
                                <td>${lecturer._id}</td>
                                <td>${lecturer.name}</td>
                                <td>${lecturer.did}</td>
                                <td>
                                    <form action="/lecturers/delete/${lecturer._id}" method="POST" style="display:inline;">
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
        console.error('Error fetching lecturers:', err.message);
        res.status(500).send('Error retrieving lecturers');
    }
};

// Render Add Lecturer Page
exports.renderAddLecturerPage = (req, res) => {
    const { error, _id, name, did } = req.query;
    res.send(`
        <html>
            <head><title>Add Lecturer</title></head>
            <body>
                <h1>Add Lecturer</h1>
                ${error ? `<p style="color: red;">${error}</p>` : ''}
                <form action="/lecturers/add" method="POST">
                    <label>Lecturer ID:</label>
                    <input type="text" name="_id" value="${_id || ''}" required><br>
                    <label>Name:</label>
                    <input type="text" name="name" value="${name || ''}" required><br>
                    <label>Department ID:</label>
                    <input type="text" name="did" value="${did || ''}" required><br>
                    <button type="submit">Add Lecturer</button>
                </form>
                <a href="/lecturers">Back to Lecturers Page</a>
            </body>
        </html>
    `);
};

// Add a lecturer with validation
exports.addLecturerWithValidation = async (req, res) => {
    const { _id, name, did } = req.body;

    if (!_id || _id.length < 2 || !name || name.length < 2 || !did || did.length < 2) {
        return res.redirect(`/lecturers/add?error=Invalid input&_id=${_id}&name=${name}&did=${did}`);
    }

    try {
        const db = await connectMongo();
        await db.collection('lecturers').insertOne({ _id, name, did });
        res.redirect('/lecturers');
    } catch (err) {
        res.redirect(`/lecturers/add?error=Error adding lecturer`);
    }
};

// Delete a lecturer with validation
exports.deleteLecturer = async (req, res) => {
    const { _id } = req.params;
    try {
        const dbMySQL = await connectMySQL();
        const [rows] = await dbMySQL.execute('SELECT * FROM module WHERE lecturer = ?', [_id]);

        if (rows.length > 0) {
            return res.send(`
                <html>
                    <head><title>Error</title></head>
                    <body>
                        <h1>Error</h1>
                        <p>Cannot delete lecturer. Lecturer with ID ${_id} teaches one or more modules.</p>
                        <a href="/lecturers">Back to Lecturers Page</a>
                    </body>
                </html>
            `);
        }

        const dbMongo = await connectMongo();
        const result = await dbMongo.collection('lecturers').deleteOne({ _id });
        if (result.deletedCount === 0) {
            return res.send(`
                <html>
                    <head><title>Error</title></head>
                    <body>
                        <h1>Error</h1>
                        <p>Lecturer not found.</p>
                        <a href="/lecturers">Back to Lecturers Page</a>
                    </body>
                </html>
            `);
        }
        res.redirect('/lecturers');
    } catch (err) {
        console.error('Error deleting lecturer:', err.message);
        res.status(500).send('Error deleting lecturer');
    }
};
