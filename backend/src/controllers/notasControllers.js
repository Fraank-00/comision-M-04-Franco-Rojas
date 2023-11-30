const notasControllers = {};

const Nota = require('../models/notasModel.js');

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

module.exports = notasControllers;
