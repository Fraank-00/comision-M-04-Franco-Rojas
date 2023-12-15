const notasControllers = {};

const Nota = require('../models/notasModel');
const Comentario = require('../models/comentarioModel');

// Obtener todas las notas
notasControllers.getNotas = async (req, res) => {
  const notas = await Nota.find();
  res.json(notas);
};

// Crear una nueva nota
notasControllers.crearNota = async (req, res) => {
  const { titulo, contenido, autor, fecha } = req.body;

  const fechaValida = fecha ? new Date(fecha) : null;

  const nuevaNota = new Nota({
    titulo: titulo,
    contenido: contenido,
    autor: autor,
    fecha: fechaValida,
  });

  try {
    await nuevaNota.validate();
    await nuevaNota.save();
    res.json({ mensaje: 'Nota guardada' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener una nota por su ID
notasControllers.getNota = async (req, res) => {
  try {
    const nota = await Nota.findById(req.params.id);

    if (!nota) {
      res.status(404).json({ mensaje: 'Nota no encontrada' });
      return;
    }

    res.json(nota);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar una nota existente
notasControllers.actualizarNota = async (req, res) => {
  try {
    const { titulo, contenido, autor } = req.body;

    await Nota.findByIdAndUpdate(req.params.id, {
      titulo,
      contenido,
      autor,
    });

    const notaActualizada = await Nota.findById(req.params.id);

    if (!notaActualizada) {
      res.status(404).json({ mensaje: 'La nota no se pudo actualizar' });
      return;
    }

    res.json({ mensaje: 'Nota actualizada' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una nota existente
notasControllers.eliminarNota = async (req, res) => {
  try {
    const nota = await Nota.findByIdAndDelete(req.params.id);

    if (!nota) {
      res.status(404).json({ mensaje: 'No se encontró la nota' });
      return;
    }

    res.json({ mensaje: 'Nota eliminada' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Función para obtener comentarios (usada para obtener, no crear)
notasControllers.getComentarios = async (req, res) => {
  try {
    const comentarios = await Comentario.find({ notaId: req.params.id });
    res.json(comentarios);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Función para crear un nuevo comentario
notasControllers.crearComentario = async (req, res) => {
  try {
    const { autor, contenido } = req.body;
    const nuevoComentario = new Comentario({
      autor,
      contenido,
      nota: req.params.id,
    });

    await nuevoComentario.validate();
    await nuevoComentario.save();

    res.json({ mensaje: 'Comentario guardado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Actualizar un comentario existente
notasControllers.actualizarComentario = async (req, res) => {
  try {
    const { contenido } = req.body;
    await Comentario.findByIdAndUpdate(req.params.comentarioId, {
      contenido,
    });

    const comentarioActualizado = await Comentario.findById(req.params.comentarioId);

    if (!comentarioActualizado) {
      res.status(404).json({ mensaje: 'El comentario no se pudo actualizar' });
      return;
    }

    res.json({ mensaje: 'Comentario actualizado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un comentario existente
notasControllers.eliminarComentario = async (req, res) => {
  try {
    const comentario = await Comentario.findByIdAndDelete(req.params.comentarioId);

    if (!comentario) {
      res.status(404).json({ mensaje: 'No se encontró el comentario' });
      return;
    }

    res.json({ mensaje: 'Comentario eliminado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = notasControllers;
