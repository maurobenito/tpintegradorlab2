const express = require('express');
const path = require('path');
const helmet = require('helmet');  // Agregado para mejorar la seguridad
const routes = require('./routes/index');
const app = express();

// Middleware básico
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Seguridad adicional con Helmet
app.use(helmet()); // Agrega encabezados de seguridad comunes



// Archivos estáticos y configuración de vistas
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de seguridad específica
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// Importación de modelos (Ejemplo de conexión para futuras consultas)
const {
    Calendar, Especialidad, Estado, Medicos,
    MedicoEsp, Perfil, Persona, Sucursal,
    TipoAtencion, Turno
} = require('./models');

// Configuración de rutas
app.use('/', routes);

// Manejo de error 404 - Página no encontrada
app.use((req, res, next) => {
    res.status(404).render('404', { 
        title: 'Página no encontrada',
        message: 'La página que buscas no existe'
    });
});

// Manejador de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).render('error', {
        title: 'Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Ha ocurrido un error'
    });
});

module.exports = app;
