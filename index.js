const express = require('express');
const bodyParser = require('body-parser');
const lecturersRoutes = require('./routes/lecturers');
const studentsRoutes = require('./routes/students'); 
const gradesRoutes = require('./routes/grades'); 

const app = express();
const PORT = 3004;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/lecturers', lecturersRoutes); // Lecturers management
app.use('/students', studentsRoutes); // Students management
app.use('/grades', gradesRoutes); // Grades management

// Root route
app.get('/', (req, res) => {
    res.send('Welcome');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
