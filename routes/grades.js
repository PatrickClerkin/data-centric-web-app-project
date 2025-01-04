const express = require('express');
const router = express.Router();
const gradesController = require('../controllers/gradesController');

// Fetch all grades
router.get('/', gradesController.getAllGrades);

// Add a new grade
router.post('/add', gradesController.addGrade);

// Update an existing grade
router.post('/edit', gradesController.updateGrade);

module.exports = router;
