// usuariosModel.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Definir el esquema de la colección "usuario"
const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  contraseña: {
    type: String,
    required: true,
  },
});

// Crear el modelo "Usuario" utilizando el esquema definido
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
