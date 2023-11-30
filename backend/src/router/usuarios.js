const { Router } = require('express');
const router = Router();

const {
  getUsuarios,
  Crearusuario,
  Editarusuario,
  Eliminarusuario,
} = require('../controllers/usuariosControllers');

// Ruta para obtener todos los usuarios y crear un nuevo usuario
router.route('/')
  .get(getUsuarios)
  .post(Crearusuario);

// Ruta para editar un usuario existente y eliminar un usuario
router.route('/:id')
  .put(Editarusuario)
  .delete(Eliminarusuario);

module.exports = router;
