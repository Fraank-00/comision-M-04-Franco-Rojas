const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./conf/passport-config')

// Configuración
app.set('puerto', 3000);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(session({
    secret: '5555', // Cambia esto con una clave segura en producción
    resave: false,
    saveUninitialized: true
  }));

// Rutas
app.use('/usuarios', require('./router/usuarios'));
app.use('/notas', require('./router/notas'));
app.use('/auth', require('./router/auth'));
app.use('/comentarios', require('./router/comentariosRoutes'))
app.use(passport.initialize());

module.exports = app;
