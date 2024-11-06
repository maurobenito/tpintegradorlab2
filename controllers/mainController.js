// controllers/maincontroller.js
const { Usuario, Persona } = require('../models');

const mainController = {
    home: async (req, res) => {
        try {
            res.render('index', {
                title: 'Inicio',
                user: req.user || null,
                persona: req.persona || null
            });
        } catch (error) {
            console.error('Error en home:', error);
            res.status(500).render('error', {
                message: 'Error interno del servidor'
            });
        }
    }
};

module.exports = mainController;
