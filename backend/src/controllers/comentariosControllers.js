
const comentariosControllers = {};
const Comentario = require('../models/notasModel');

comentariosControllers.getComentarios = async (req, res) => {
  const comentarios = await Comentario.find();
  res.json(comentarios);
};

comentariosControllers.crearComentario = async (req, res) => {
  const { autor, contenido, posteoId } = req.body;

  const nuevoComentario = new Comentario({
    autor,
    contenido,
    posteo: posteoId,
  });

  try {
    await nuevoComentario.validate();
    await nuevoComentario.save();
    res.json({ mensaje: 'Comentario guardado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

comentariosControllers.actualizarComentario = async (req, res) => {
  try {
    const { comentarioId } = req.params;
    const { contenido } = req.body;

    // Verifica si el ID del comentario es válido
    if (!comentarioId) {
      return res.status(400).json({ mensaje: 'ID de comentario inválido' });
    }

    // Busca y actualiza el comentario en la base de datos
    const comentarioActualizado = await Comentario.findByIdAndUpdate(
      comentarioId,
      { contenido },
      { new: true }
    );

    if (!comentarioActualizado) {
      return res.status(404).json({ mensaje: 'Comentario no encontrado' });
    }

    res.json({ mensaje: 'Comentario actualizado exitosamente', comentario: comentarioActualizado });
  } catch (error) {
    console.error('Error al actualizar comentario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

comentariosControllers.eliminarComentario = async (req, res) => {
  try {
    const { comentarioId } = req.params;

    // Verifica si el ID del comentario es válido
    if (!comentarioId) {
      return res.status(400).json({ mensaje: 'ID de comentario inválido' });
    }

    // Busca y elimina el comentario en la base de datos
    const comentarioEliminado = await Comentario.findByIdAndDelete(comentarioId);

    if (!comentarioEliminado) {
      return res.status(404).json({ mensaje: 'Comentario no encontrado' });
    }

    res.json({ mensaje: 'Comentario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar comentario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = comentariosControllers;



