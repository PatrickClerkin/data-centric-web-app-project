const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');

// Define routes
router.get('/', studentsController.getAllStudents); // Fetch all students
router.get('/add', studentsController.renderAddStudentPage); // Render Add Student Page
router.post('/add', studentsController.addStudentWithValidation); // Add Student with Validation
router.get('/edit/:sid', studentsController.renderUpdateStudentPage); // Render Update Student Page
router.post('/edit/:sid', studentsController.updateStudent); // Update Student
router.post('/delete/:sid', studentsController.deleteStudent); // Delete Student

module.exports = router;
