const express = require('express');
const router = express.Router();
const lecturersController = require('../controllers/lecturersController');

router.get('/', lecturersController.getAllLecturers);
router.post('/add', lecturersController.addLecturer);
router.post('/edit/:_id', lecturersController.updateLecturer);
router.delete('/delete/:_id', lecturersController.deleteLecturer);

module.exports = router;
