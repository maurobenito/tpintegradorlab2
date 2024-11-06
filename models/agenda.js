// Importamos el modelo de Sequelize para interactuar con la base de datos
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Ajusta la ruta a tu archivo de configuración de la base de datos

// Definimos el modelo de Agenda
class Agenda extends Model {}

Agenda.init({
  agendaid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  persona_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sucursal_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ttipoid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombreagenda: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  duracion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  medico_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'agenda',
  tableName: 'agenda',
  timestamps: false // Si no tienes campos de tipo 'createdAt' o 'updatedAt'
});

// Relacionamos la Agenda con las otras tablas
Agenda.associate = (models) => {
  // Relación con persona
  Agenda.belongsTo(models.Persona, {
    foreignKey: 'persona_id',
    as: 'persona'
  });

  // Relación con sucursal
  Agenda.belongsTo(models.Sucursal, {
    foreignKey: 'sucursal_id',
    as: 'sucursal'
  });

  // Relación con tipoatencion
  Agenda.belongsTo(models.TipoAtencion, {
    foreignKey: 'ttipoid',
    as: 'tipoatencion'
  });

  // Relación con medico
  Agenda.belongsTo(models.Medicos, {
    foreignKey: 'medico_id',
    as: 'medico'
  });
};

module.exports = Agenda;
