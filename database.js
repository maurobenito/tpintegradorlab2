const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'turnos_medicos',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
    pool: {            // Opciones de conexión para mejorar el rendimiento
      max: 5,          // Máximo número de conexiones en el pool
      min: 0,          // Mínimo número de conexiones en el pool
      acquire: 30000,  // Tiempo máximo de espera para adquirir conexión (ms)
      idle: 10000      // Tiempo de espera antes de liberar conexión inactiva (ms)
    }
  }
);

module.exports = sequelize;
