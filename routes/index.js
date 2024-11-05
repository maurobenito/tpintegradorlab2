// routes/index.js
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// Ruta para mostrar el formulario de login
router.get('/login', mainController.showLogin);  // Usando el controlador

module.exports = router;
