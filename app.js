// app.js
const express = require('express');
const path = require('path');
const routes = require('./routes/index');  // Importa las rutas

const app = express();

// Configuración de middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración del motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Configuración de las rutas
app.use('/', routes);

module.exports = app;  // Exporta app para que sea utilizado por server.js
