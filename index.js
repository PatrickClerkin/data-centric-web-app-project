const express = require('express');
const app = express();
const studentsRouter = require('./routes/students');
const gradesRoutes = require('./routes/grades');
const lecturersRoutes = require('./routes/lecturers');



app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use('/lecturers', lecturersRoutes);

app.use('/students', studentsRouter);
app.use('/grades', gradesRoutes);

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head><title>Home</title></head>
            <body>
                <h1>Welcome to the Web App</h1>
                <h1>G00419318</h1>
                <a href="/students">Students</a><br>
                <a href="/grades">Grades</a><br>
                <a href="/lecturers">Lecturers</a>
            </body>
        </html>
    `);
});

const PORT = 3004;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
