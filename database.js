const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
<<<<<<< HEAD
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'turnos_medicos'
});

connection.connect((error) => {
    if (error) {
        console.log('El error de conexión es: ' + error);
        return;
    }
    console.log('¡Conectado a la base de datos!');
});

module.exports = connection;
=======
    dialect: 'mysql',
    logging: false,
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa.');
  })
  .catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
  });

module.exports = sequelize;

>>>>>>> parent of 7c5bb67 (prueba)
