const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');

// Get all students
router.get('/', studentsController.getAllStudents);

// Add a new student
router.post('/add', studentsController.addStudent);

// Update an existing student
router.post('/edit/:sid', studentsController.updateStudent);

module.exports = router;
