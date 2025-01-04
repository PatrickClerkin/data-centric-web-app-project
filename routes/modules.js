const express = require('express');
const router = express.Router();
const modulesController = require('../controllers/modulesController');

// Fetch all modules
router.get('/', modulesController.getAllModules);

// Add a new module
router.post('/add', modulesController.addModule);

// Update an existing module
router.post('/edit/:mid', modulesController.updateModule);

module.exports = router;
