// Importar las dependencias necesarias
import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Crear y exportar el componente CrearUsuario
export default class CrearUsuario extends Component {
  // Definir el estado inicial del componente
  state = {
    usuarios: [],
    nuevoUsuarioNombre: '',
    usuarioEnEdicion: null,
    nombreEditado: '',
    nuevaContraseña: '',

  };

  // Obtener la lista de usuarios cuando el componente se monta
  async componentDidMount() {
    try {
      const resp = await axios.get('http://localhost:3000/usuarios');
      this.setState({ usuarios: resp.data });
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  }

  // Manejar cambios en el input nuevoUsuarioNombre
  handleNombreChange = (event) => {
    const nombreField = this.state.usuarioEnEdicion ? 'nombreEditado' : 'nuevoUsuarioNombre';
    this.setState({ [nombreField]: event.target.value });
  };

  // Manejar cambios en el input nuevaContraseña
  handleContraseñaChange = (event) => {
    this.setState({ nuevaContraseña: event.target.value });
  };

  // Manejar el clic al crear un nuevo usuario
  handleAceptarClick = async () => {
    try {
      if (this.state.usuarioEnEdicion) {
        // Modo de edición
        await axios.put(`http://localhost:3000/usuarios/${this.state.usuarioEnEdicion}`, {
          nombre: this.state.nombreEditado,
          contraseña: this.state.nuevaContraseña,
        });
      } else {
        // Modo de creación
        await axios.post('http://localhost:3000/usuarios', {
          nombre: this.state.nuevoUsuarioNombre,
          contraseña: this.state.nuevaContraseña,
        });
      }

      const resp = await axios.get('http://localhost:3000/usuarios');
      this.setState({
        usuarios: resp.data,
        usuarioEnEdicion: null,
        nuevoUsuarioNombre: '', // Limpiar el nombre después de crear o editar
        nombreEditado: '',
        nuevaContraseña: '',
      });
    } catch (error) {
      console.error('Error al guardar la edición del usuario:', error);
    }
  };


  // Manejar el clic al eliminar un usuario
  handleEliminarClick = async (usuarioId) => {
    try {
      await axios.delete(`http://localhost:3000/usuarios/${usuarioId}`);

      const resp = await axios.get('http://localhost:3000/usuarios');
      this.setState({ usuarios: resp.data, usuarioEnEdicion: null });
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  // Manejar el clic al editar un usuario
  handleEditarClick = (usuarioId, nombreUsuario, usuarioContraseña) => {
    this.setState({
      usuarioEnEdicion: usuarioId,
      nombreEditado: nombreUsuario,
      nuevaContraseña: usuarioContraseña,
    });
  };


  // Manejar el clic al guardar la edición de la información del usuario
  handleGuardarEdicion = async (usuarioId) => {
    try {
      await axios.put('http://localhost:3000/usuarios/' + usuarioId, {
        nombre: this.state.nombreEditado,
        contraseña: this.state.nuevaContraseña,
      });

      const resp = await axios.get('http://localhost:3000/usuarios');
      this.setState({
        usuarios: resp.data,
        usuarioEnEdicion: null,
        nombreEditado: '',
        nuevaContraseña: '', // Limpiar la contraseña después de guardar la edición
      });
    } catch (error) {
      console.error('Error al guardar la edición del usuario:', error);
    }
  };
  // Renderizar el componente
  render() {
    return (
      <div className='row'>
        {/* Formulario para crear o editar un usuario */}
        <div className="col-md-4">
          <div className="card card-body">
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>{this.state.usuarioEnEdicion ? 'Editar Usuario' : 'Crear Usuario'}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre"
                  value={this.state.usuarioEnEdicion ? this.state.nombreEditado : this.state.nuevoUsuarioNombre}
                  onChange={this.handleNombreChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicContraseña">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  value={this.state.nuevaContraseña}  // Utilizar nuevaContraseña para mostrar la contraseña en el formulario de edición
                  onChange={this.handleContraseñaChange}
                />
              </Form.Group>
              <Button variant="primary" type="button" onClick={this.handleAceptarClick}>
                {this.state.usuarioEnEdicion ? 'Guardar' : 'Aceptar'}
              </Button>
            </Form>
          </div>
        </div>

        {/* Lista de usuarios */}
        <div className="col-md-8">
          <ul className="list-group">
            {this.state.usuarios.map((usuario) => (
              <li key={usuario._id} className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'>
                {/* Editar la información del usuario */}
                {this.state.usuarioEnEdicion === usuario._id ? (
                  <Form.Control
                    type="text"
                    value={this.state.nombreEditado}
                    onChange={(e) => this.setState({ nombreEditado: e.target.value })}
                  />
                ) : (
                  usuario.nombre
                )}

                {/* Acciones del usuario */}
                <div>
                  {this.state.usuarioEnEdicion !== usuario._id && (
                    <Button variant="warning" size="sm" onClick={() => this.handleEditarClick(usuario._id, usuario.nombre, usuario.contraseña)}>
                      Editar
                    </Button>
                  )}
                  <Button variant="danger" size="sm" onClick={() => this.handleEliminarClick(usuario._id)}>
                    Eliminar
                  </Button>
                  {this.state.usuarioEnEdicion === usuario._id && (
                    <Button variant="success" size="sm" onClick={() => this.handleGuardarEdicion(usuario._id)}>
                      Guardar
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}