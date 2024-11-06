var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models").User;

// Ruta de logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  req.logout();
  res.redirect("/");
});

// Defino un middleware para autenticación
var EstaAutenticado = function (req, res, next) {
  if (req.isAuthenticated() && req.user) {
    return next();
  }
  // Si el usuario no está autenticado, lo redirige a la página de login
  res.redirect("/");
};

module.exports = router;
module.exports.EstaAutenticado = EstaAutenticado;
