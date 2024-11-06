const db = require('../database');

const autenticarUsuario = (username, password, callback) => {
  const query = `
    SELECT * 
    FROM user 
    WHERE nombre_user = ? 
  `;
  db.query(query, [username], (err, results) => {
    if (err) {
      return callback(err);
    }
    if (results.length === 0) {
      return callback(null, false);
    }

    const usuario = results[0];
    if (usuario.password === password) {
      return callback(null, usuario);
    } else {
      return callback(null, false);
    }
  });
};

const obtenerUsuarioPorId = (id, callback) => {
  const query = `
    SELECT * 
    FROM user 
    WHERE userid = ? 
  `;
  db.query(query, [id], (err, results) => {
    if (err) {
      return callback(err);
    }
    if (results.length === 0) {
      return callback(null, false);
    }
    return callback(null, results[0]);
  });
};

const verificarPermisos = (idUsuario, permiso, callback) => {
  const query = `
    SELECT permisos 
    FROM perfil 
    WHERE perfilid = (
      SELECT idperfil FROM user WHERE userid = ?
    )
  `;
  db.query(query, [idUsuario], (err, results) => {
    if (err) {
      return callback(err);
    }
    if (results.length === 0) {
      return callback(null, false);
    }

    const permisos = results[0].permisos.split(',');
    return callback(null, permisos.includes(permiso));
  });
};

module.exports = {
  autenticarUsuario,
  obtenerUsuarioPorId,
  verificarPermisos
};
