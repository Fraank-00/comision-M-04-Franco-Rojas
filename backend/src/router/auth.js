const express = require('express');
const router = express.Router();
const autenticacionControllers = require('../controllers/autenticacionControllers');

router.post('/registro', autenticacionControllers.Crearusuario);
router.post('/login', autenticacionControllers.IniciarSesion);
router.post('/logout', autenticacionControllers.CerrarSesion);

module.exports = router;
