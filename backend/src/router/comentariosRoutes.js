const { Router } = require('express');
const router = Router();
const passport = require('passport'); // Importa el middleware de passport

const {
  getComentarios,
  crearComentario,
  actualizarComentario,
  eliminarComentario,
} = require('../controllers/comentariosControllers');

// Middleware de autenticación con JWT
const autenticarJWT = passport.authenticate('jwt', { session: false });

// Rutas protegidas
router.route('/')
  .get(autenticarJWT, getComentarios) // Protege la ruta de obtener comentarios
  .post(autenticarJWT, crearComentario); // Protege la ruta de crear comentario

router.route('/:id')
  .put(autenticarJWT, actualizarComentario) // Protege la ruta de actualizar comentario
  .delete(autenticarJWT, eliminarComentario); // Protege la ruta de eliminar comentario

module.exports = router;
