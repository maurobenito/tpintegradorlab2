const express = require('express');
const path = require('path');
<<<<<<< HEAD
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const authController = require('./controllers/autenticacionctrl');

// Cargar variables de entorno al inicio
dotenv.config();

// Verificar variable de entorno crítica
if (!process.env.SESSION_SECRET) {
    console.error('no está definida en las variables de entorno');
    process.exit(1);
}

const app = express();

// Middlewares
=======
const routes = require('./routes/index'); 
const app = express();

// Configuración de middleware
>>>>>>> parent of 7c5bb67 (prueba)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000
    }
}));

<<<<<<< HEAD
// View engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Rutas públicas
app.use('/auth', require('./routes/autenticacion'));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Middleware de autenticación global para todas las rutas excepto /auth
app.use((req, res, next) => {
    if (req.path.startsWith('/auth/') || 
        req.path.startsWith('/css/') || 
        req.path.startsWith('/js/') || 
        req.path.startsWith('/images/')) {
        return next();
    }
    authController.isAuthenticated(req, res, next);
});

// Rutas protegidas
app.use('/', require('./routes/index'));

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).render('404', { 
        title: 'Página no encontrada',
        user: req.user,
        persona: req.persona
    });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('404', { 
        title: 'Error del servidor',
        user: req.user,
        persona: req.persona
    });
=======
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
>>>>>>> parent of 7c5bb67 (prueba)
});

module.exports = app;

