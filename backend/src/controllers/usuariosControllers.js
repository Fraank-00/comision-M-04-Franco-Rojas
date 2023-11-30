const usuarioControllers = {};
const Usuario = require('../models/usuariosModel');

// Obtener todos los usuarios
usuarioControllers.getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

// Crear un nuevo usuario
usuarioControllers.Crearusuario = async (req, res) => {
  const { nombre, contraseña } = req.body;
  const nuevoUsuario = new Usuario({ nombre, contraseña });

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

module.exports = usuarioControllers;
