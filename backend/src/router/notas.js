const { Router } = require('express');
const router = Router();
const notasControllers = require('../controllers/notasControllers');

// Rutas para notas
router.route('/')
  .get(notasControllers.getNotas)
  .post(notasControllers.crearNota);

router.route('/:id')
  .get(notasControllers.getNota)
  .put(notasControllers.actualizarNota)
  .delete(notasControllers.eliminarNota);

// Rutas para comentarios
router.route('/:id/comentarios')
  .get(notasControllers.getComentarios)
  .post(notasControllers.crearComentario);

router.route('/:id/comentarios/:comentarioId')
  .put(notasControllers.actualizarComentario)
  .delete(notasControllers.eliminarComentario);

module.exports = router;
