const express = require('express');
const router = express.Router();
const gradesController = require('../controllers/gradesController');

// Routes for Grades
router.get('/', gradesController.getAllGrades);
router.get('/edit/:sid/:mid', gradesController.renderEditGradePage);
router.post('/edit/:sid/:mid', gradesController.updateGradeWithValidation);

module.exports = router;
