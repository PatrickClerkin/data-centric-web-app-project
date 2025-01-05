const express = require('express');
const router = express.Router();
const lecturersController = require('../controllers/lecturersController');

router.get('/', lecturersController.getAllLecturers);
router.get('/add', lecturersController.renderAddLecturerPage);
router.post('/add', lecturersController.addLecturerWithValidation);
router.post('/delete/:_id', lecturersController.deleteLecturer); // Updated to POST for form compatibility

module.exports = router;
