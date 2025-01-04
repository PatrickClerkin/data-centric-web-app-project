const express = require('express');
const bodyParser = require('body-parser');
const studentsRoutes = require('./routes/students');
const gradesRoutes = require('./routes/grades');
const lecturersRoutes = require('./routes/lecturers');

const app = express();
const PORT = 3004;

app.use(bodyParser.json());

app.use('/students', studentsRoutes);
app.use('/grades', gradesRoutes);
app.use('/lecturers', lecturersRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Data-Centric Web Application API!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
