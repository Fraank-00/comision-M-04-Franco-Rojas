const { Schema, model } = require('mongoose');

// Definir el esquema de la colección "posteo"
const posteoSchema = new Schema({
  titulo: String,
  contenido: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  autor: String,
  comentarios: [
    {
      autor: String,
      contenido: String,
      fecha: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, {
  timestamps: true, // Agrega campos de fecha de creación y actualización automáticamente
});

// Crear el modelo "Posteo" utilizando el esquema definido
module.exports = model('Posteo', posteoSchema);
