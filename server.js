// server.js
const sequelize = require('./database');  // Importa la conexión a la base de datos
const app = require('./app');  // Importa la configuración de la aplicación desde app.js


const PORT = process.env.PORT || 5000;

// Inicia el servidor y se conecta a la base de datos
app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.');

        // Sincroniza los modelos
        await sequelize.sync({ force: false }); // Cambia a true si deseas borrar y recrear tablas
        console.log('Modelos sincronizados correctamente.');

        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
});
