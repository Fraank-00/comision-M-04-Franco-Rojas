const usuarioControllers = {};
const Usuario = require('../models/usuariosModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'hola12345'; // Reemplaza esto con una clave segura en un entorno de producción

// Obtener todos los usuarios
usuarioControllers.getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

// Crear un nuevo usuario
usuarioControllers.Crearusuario = async (req, res) => {
  const { nombre, contraseña } = req.body;
  const hashedContraseña = await bcrypt.hash(contraseña, 10);

  const nuevoUsuario = new Usuario({ nombre, contraseña: hashedContraseña });

  try {
    await nuevoUsuario.validate();
    await nuevoUsuario.save();
    res.json({ mensaje: 'Usuario creado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Editar un usuario existente
usuarioControllers.Editarusuario = async (req, res) => {
  try {
    const { nombre, contraseña } = req.body;

    await Usuario.findByIdAndUpdate(req.params.id, {
      nombre,
      contraseña,
    });

    const usuarioActualizado = await Usuario.findById(req.params.id);

    if (!usuarioActualizado) {
      res.status(404).json({ mensaje: 'El usuario no se pudo actualizar' });
      return;
    }

    res.json({ mensaje: 'Usuario actualizado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un usuario existente
usuarioControllers.Eliminarusuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);

    if (!usuario) {
      res.status(404).json({ mensaje: 'El usuario no pudo ser eliminado' });
      return;
    }

    res.json({ mensaje: 'Usuario eliminado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Iniciar sesión
usuarioControllers.IniciarSesion = async (req, res) => {
  const { nombre, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ nombre });

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!contraseñaValida) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ userId: usuario._id }, secretKey, { expiresIn: '1h' });

    // Imprimir la respuesta antes de enviarla
    console.log('Respuesta en IniciarSesion:', { mensaje: 'Inicio de sesión exitoso', token });

    res.json({ mensaje: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Cerrar sesión
// Cerrar sesión
usuarioControllers.CerrarSesion = async (req, res) => {
  try {
    console.log('Iniciando cierre de sesión');

    // No es necesario destruir la sesión cuando se utiliza JWT.
    // Solo responde con un mensaje indicando que la sesión se cerró.

    console.log('Sesión cerrada con éxito');
    res.json({ mensaje: 'Sesión cerrada exitosamente' });
  } catch (error) {
    console.error('Error en el controlador de cerrar sesión:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};


module.exports = usuarioControllers;
