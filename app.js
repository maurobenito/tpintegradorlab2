const express = require('express');
const path = require('path');
const routes = require('./routes/index'); 
const app = express();

// Configuración de middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de archivos estáticos y motor de vistas
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/uploads', express.static('uploads'));

// Importación de modelos
const Calendar = require('./models/calendar');
const Especialidad = require('./models/especialidad');
const Estado = require('./models/estado');
const Medicos = require('./models/medicos');
const MedicoEsp = require('./models/medico_esp');
const Perfil = require('./models/perfil');
const Persona = require('./models/persona');
const Sucursal = require('./models/sucursal');
const TipoAtencion = require('./models/tipoatencion');
const Turno = require('./models/turno');

// Configuración de las rutas
app.use('/', routes);

// Manejo de errores 404
app.use((req, res, next) => {
    res.status(404).render('404', { title: 'Página no encontrada' });
});

module.exports = app;

