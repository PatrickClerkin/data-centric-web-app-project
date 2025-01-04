const connectMongo = require('../config/mongo');

// Fetch all lecturers
exports.getAllLecturers = async (req, res) => {
    try {
        const db = await connectMongo();
        const lecturers = await db.collection('lecturers').find().toArray();
        res.json(lecturers);
    } catch (err) {
        console.error('Error fetching lecturers:', err.message);
        res.status(500).send('Error retrieving lecturers');
    }
};

// Add a new lecturer
exports.addLecturer = async (req, res) => {
    const { _id, name, did } = req.body;
    try {
        const db = await connectMongo();
        await db.collection('lecturers').insertOne({ _id, name, did });
        res.status(201).send('Lecturer added successfully');
    } catch (err) {
        console.error('Error adding lecturer:', err.message);
        res.status(500).send('Error adding lecturer');
    }
};

// Update an existing lecturer
exports.updateLecturer = async (req, res) => {
    const { _id } = req.params;
    const { name, did } = req.body;
    try {
        const db = await connectMongo();
        const result = await db.collection('lecturers').updateOne(
            { _id },
            { $set: { name, did } }
        );
        if (result.matchedCount === 0) {
            return res.status(404).send('Lecturer not found');
        }
        res.send('Lecturer updated successfully');
    } catch (err) {
        console.error('Error updating lecturer:', err.message);
        res.status(500).send('Error updating lecturer');
    }
};
