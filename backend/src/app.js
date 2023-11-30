const express = require('express');
const cors = require('cors');
const app = express();

// Configuración
app.set('puerto', 3000);

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/usuarios', require('./router/usuarios'));
app.use('/notas', require('./router/notas'));

module.exports = app;
