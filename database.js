const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('turnos_medicos', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;