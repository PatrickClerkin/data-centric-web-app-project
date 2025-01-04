const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');

router.get('/', studentsController.getAllStudents);
router.post('/add', studentsController.addStudent);
router.post('/edit/:sid', studentsController.updateStudent);
router.delete('/delete/:sid', studentsController.deleteStudent);

module.exports = router;
