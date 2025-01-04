const express = require('express');
const router = express.Router();
const gradesController = require('../controllers/gradesController');

router.post('/edit/:sid/:mid', gradesController.updateGrade);
router.delete('/delete/:sid/:mid', gradesController.deleteGrade);

module.exports = router;
