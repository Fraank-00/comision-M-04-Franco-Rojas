
const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
  contenido: String,
  autor: String,
  nota: { type: mongoose.Schema.Types.ObjectId, ref: 'Nota' },
});

const Comentario = mongoose.model('Comentario', comentarioSchema);

module.exports = Comentario;
