const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');

// Route to fetch all students
router.get('/', studentsController.getAllStudents);

module.exports = router;
