const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'hola12345'; 
const Usuario = require('../models/usuariosModel');

const autenticacionControllers = {};

autenticacionControllers.Crearusuario = async (req, res) => {
  const { nombre, contraseña } = req.body;

  try {
    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ nombre });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Hash de la contraseña antes de almacenarla
    const hashedContraseña = await bcrypt.hash(contraseña, 10);

    const nuevoUsuario = new Usuario({ nombre, contraseña: hashedContraseña });

    await nuevoUsuario.validate();
    await nuevoUsuario.save();

    res.json({ mensaje: 'Usuario creado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

autenticacionControllers.IniciarSesion = async (req, res) => {
  const { nombre, contraseña } = req.body;

  try {
    // Buscar al usuario por su nombre
    const usuario = await Usuario.findOne({ nombre });

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!contraseñaValida) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Generar un token JWT
    const token = jwt.sign({ userId: usuario._id }, secretKey, { expiresIn: '1h' });

    res.json({ mensaje: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

autenticacionControllers.CerrarSesion = async (req, res) => {
  try {
     
    req.session.destroy((err) => {
      if (err) {
        console.error('Error al cerrar sesión:', err);
        res.status(500).json({ error: 'Error al cerrar sesión' });
      } else {
        res.json({ mensaje: 'Sesión cerrada exitosamente' });
      }
    });
  } catch (error) {
    
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = autenticacionControllers;
