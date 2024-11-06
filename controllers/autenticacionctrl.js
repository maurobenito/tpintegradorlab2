const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../database");
const { promisify } = require("util");

// Login
exports.login = async function (req, res) {
    try {
        const nombre_user = req.body.email;
        const pass = req.body.password;
        
        if (!nombre_user || !pass) {
            return res.render("login", {
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y password",
                alertIcon: "info",
                showConfirmButton: true,
                timer: false,
                ruta: "login",
            });
        }

        const query = `
            SELECT u.*, p.*, pf.tipo as rol
            FROM user u
            LEFT JOIN persona p ON u.userid = p.userid
            LEFT JOIN perfil pf ON u.idperfil = pf.perfilid
            WHERE u.nombre_user = ? AND u.estado = 1
        `;

        db.query(query, [nombre_user], async (error, results) => {
            if (error) {
                console.log("Error en consulta:", error);
                return res.render("login", {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Error en el servidor",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: false,
                    ruta: "login"
                });
            }

            if (results.length === 0 || !(await bcrypt.compare(pass, results[0].password))) {
                return res.render("login", {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Usuario y/o Password incorrectas",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: 2500,
                    ruta: "login"
                });
            }

            const usuario = results[0];
            const token = jwt.sign(
                { id: usuario.userid, rol: usuario.idperfil },
                process.env.JWT_SECRETO,
                { expiresIn: process.env.JWT_TIEMPO_EXPIRA }
            );

            const cookiesOptions = {
                expires: new Date(
                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                ),
                httpOnly: true
            };

            res.cookie("jwt", token, cookiesOptions);
            return res.render("login", {
                alert: true,
                alertTitle: "Conexión exitosa",
                alertMessage: "¡LOGIN CORRECTO!",
                alertIcon: "success",
                showConfirmButton: false,
                timer: 2500,
                ruta: "/"
            });
        });

    } catch (error) {
        console.log("Error en login:", error);
        return res.render("login", {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Error en el servidor",
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: "login"
        });
    }
};

exports.isAuthenticated = async (req, res, next) => {
    if (!req.cookies.jwt) {
        return res.redirect('/auth/login');
    }

    try {
        const decodificada = await promisify(jwt.verify)(
            req.cookies.jwt,
            process.env.JWT_SECRETO
        );
        
        const query = `
            SELECT u.*, p.*, pf.tipo as rol
            FROM user u
            LEFT JOIN persona p ON u.userid = p.userid
            LEFT JOIN perfil pf ON u.idperfil = pf.perfilid
            WHERE u.userid = ? AND u.estado = 1
        `;

        db.query(query, [decodificada.id], (error, results) => {
            if (error) {
                console.log("Error en consulta:", error);
                res.clearCookie("jwt");
                return res.redirect('/auth/login');
            }

            if (results.length === 0) {
                res.clearCookie("jwt");
                return res.redirect('/auth/login');
            }

            const usuario = results[0];
            req.user = {
                id: usuario.userid,
                nombre_user: usuario.nombre_user,
                idperfil: usuario.idperfil,
                rol: usuario.rol
            };
            
            req.persona = {
                id: usuario.personaid,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                dni: usuario.dni,
                email: usuario.mail
            };

            return next();
        });
    } catch (error) {
        console.log("Error en autenticación:", error);
        res.clearCookie("jwt");
        return res.redirect('/auth/login');
    }
};

exports.isAuthorizated = (roles) => async (req, res, next) => {
    if (!req.cookies.jwt) {
        return res.redirect('/auth/login');
    }

    try {
        const decodificada = await promisify(jwt.verify)(
            req.cookies.jwt,
            process.env.JWT_SECRETO
        );
        
        const query = `
            SELECT p.tipo, p.permisos
            FROM user u
            JOIN perfil p ON u.idperfil = p.perfilid
            WHERE u.userid = ?
        `;

        db.query(query, [decodificada.id], (error, results) => {
            if (error) {
                console.log("Error en consulta:", error);
                return res.redirect('/auth/login');
            }

            if (results.length === 0) {
                return res.redirect('/auth/login');
            }

            const userRol = results[0].tipo;
            if ([].concat(roles).includes(userRol)) {
                return next();
            }

            return res.redirect('/auth/login');
        });

    } catch (error) {
        return res.redirect('/auth/login');
    }
};

exports.logout = (req, res) => {
    // Limpiar la cookie JWT
    res.clearCookie("jwt");
    
    // Limpiar la sesión si existe
    if (req.session) {
        req.session.destroy();
    }
    
    // Redirigir al login
    return res.redirect("/auth/login");
};

exports.renderLogin = (req, res) => {
    res.render('login', {
        title: 'Iniciar Sesión',
        alert: false,
        ruta: '',
        alertTitle: '',
        alertMessage: '',
        alertIcon: '',
        showConfirmButton: false,
        timer: false
    });
};

exports.renderRegister = (req, res) => {
    res.render('register', {
        title: 'Registro de Usuario',
        alert: false,
        ruta: '',
        alertTitle: '',
        alertMessage: '',
        alertIcon: '',
        showConfirmButton: false,
        timer: false
    });
};