const { Router } = require('express');
const router = Router();
const {
  getNotas,
  crearNota,
  getNota,
  actualizarNota,
  eliminarNota,
} = require('../controllers/notasControllers');

// Ruta para obtener todas las notas y crear una nueva nota
router.route('/')
  .get(getNotas)
  .post(crearNota);

// Ruta para obtener una nota por su ID, actualizar una nota existente y eliminar una nota
router.route('/:id')
  .get(getNota)
  .put(actualizarNota)
  .delete(eliminarNota);

module.exports = router;
