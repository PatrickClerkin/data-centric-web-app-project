const express = require('express');
const router = express.Router();
const lecturersController = require('../controllers/lecturersController');

// Fetch all lecturers
router.get('/', lecturersController.getAllLecturers);

// Add a new lecturer
router.post('/add', lecturersController.addLecturer);

// Update lecturer information
router.post('/edit/:_id', lecturersController.updateLecturer);

module.exports = router;
