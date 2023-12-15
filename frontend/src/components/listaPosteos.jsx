import React, { Component } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

export default class ListaPosteos extends Component {
  state = {
    notas: [],
    nuevosComentarios: {},
    usuarios: [],
  };

  componentDidMount() {
    this.getNotas();
    this.getUsuarios();
  }

  async getNotas() {
    try {
      const resp = await axios.get('http://localhost:3000/notas');
      const notasConComentarios = await Promise.all(
        resp.data.map(async (nota) => {
          const comentariosResp = await axios.get(`http://localhost:3000/notas/${nota._id}/comentarios`);
          return { ...nota, comentarios: comentariosResp.data };
        })
      );
      this.setState({ notas: notasConComentarios });
    } catch (error) {
      console.error('Error al obtener Posteos:', error);
    }
  }



  async getUsuarios() {
    try {
      const resp = await axios.get('http://localhost:3000/usuarios');
      this.setState({ usuarios: resp.data });
    } catch (error) {
      console.error('Error al obtener Usuarios:', error);
    }
  }

  async Eliminarnota(id) {
    try {
      await axios.delete(`http://localhost:3000/notas/${id}`);
      this.getNotas();
    } catch (error) {
      console.error('Error al eliminar Posteo:', error);
    }
  }
  handleEditarComentario = async (comentarioId, nuevoContenido) => {
    try {
      console.log('comentarioId:', comentarioId);
      console.log('nuevoContenido:', nuevoContenido);
  
      if (!comentarioId || !nuevoContenido) {
        console.error('ID de comentario o nuevo contenido es undefined.');
        return;
      }
  
      
      await axios.put(`http://localhost:3000/comentarios/${comentarioId}`, {
        contenido: nuevoContenido,
      });
  
      // Actualizar el estado después de la edición del comentario
      this.getNotas();
    } catch (error) {
      console.error('Error al editar comentario:', error);
    }
  };
  

  handleEliminarComentario = async (notaId, comentarioId) => {
    try {
      console.log('notaId:', notaId);
      console.log('comentarioId:', comentarioId);
  
      // Validaciones
      if (!notaId || !comentarioId) {
        console.error('ID de nota o comentario es undefined.');
        return;
      }
  
      await axios.delete(`http://localhost:3000/notas/${notaId}/comentarios/${comentarioId}`);
      // Actualiza el estado después de eliminar un comentario
      this.getNotas();
    } catch (error) {
      console.error('Error al eliminar Comentario:', error);
    }
  };

  handleNuevoComentarioChange = (event, notaId) => {
    const { name, value } = event.target;
    const nuevosComentarios = { ...this.state.nuevosComentarios, [notaId]: { ...this.state.nuevosComentarios[notaId], [name]: value } };
    this.setState({ nuevosComentarios });
  };

  handleAgregarComentario = async (notaId) => {
    try {
      const { nuevosComentarios } = this.state;
      const nuevoComentario = nuevosComentarios[notaId];

      if (nuevoComentario) {
        const nuevoComentarioData = {
          contenido: nuevoComentario.contenido,
          autor: nuevoComentario.autor,
          notaId: notaId, // Agrega el notaId al nuevo comentario
        };

        await axios.post(`http://localhost:3000/notas/${notaId}/comentarios`, nuevoComentarioData);

        const notasActualizadas = this.state.notas.map((nota) => {
          if (nota._id === notaId) {
            return {
              ...nota,
              comentarios: [...nota.comentarios, nuevoComentarioData],
            };
          }
          return nota;
        });

        this.setState({ notas: notasActualizadas });

        const nuevosComentariosActualizados = { ...nuevosComentarios, [notaId]: { contenido: '', autor: '' } };
        this.setState({ nuevosComentarios: nuevosComentariosActualizados });
      }
    } catch (error) {
      console.error('Error al agregar comentario:', error);
    }
  };

  render() {
    return (
      <div className="row">
        {this.state.notas.map((nota) => (
          <div className="col-md-4 p-2" key={nota._id}>
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h5>{nota.titulo}</h5>
                <Link to={`/edit/${nota._id}`} className="btn btn-secondary">
                  Editar
                </Link>
              </div>
              <div className="card-body">
                <p>{nota.contenido}</p>
                <p>{nota.autor}</p>
                <p>{format(nota.fecha)}</p>
              </div>
              <div className="card-footer">
                <button className="btn btn-danger me-2 rounded-pill" onClick={() => this.Eliminarnota(nota._id)}>
                  Eliminar Nota
                </button>

                {/* Sección de comentarios */}
                <div className="mt-3">
                  <h6>Comentarios</h6>
                  <ul className="list-group">
                    {nota.comentarios.map((comentario, index) => (
                      <li className="list-group-item d-flex justify-content-between" key={comentario._id || index}>
                        <span>{comentario.contenido} - {comentario.autor}</span>
                        <div>
                          <button
                            className="btn btn-danger ms-2 rounded-pill"
                            onClick={() => this.handleEliminarComentario(nota._id, comentario._id)}
                          >
                            Eliminar Comentario
                          </button>
                          <button
                            className="btn btn-warning ms-1 rounded-pill"
                            onClick={() => {
                              const nuevoContenido = prompt('Nuevo contenido del comentario:');
                              if (nuevoContenido) {
                                this.handleEditarComentario(comentario._id, nuevoContenido);
                              }
                            }}
                          >
                            Editar Comentario
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2">
                    <textarea
                      className="form-control mb-2"
                      placeholder="Agregar comentario"
                      name="contenido"
                      value={this.state.nuevosComentarios[nota._id]?.contenido || ''}
                      onChange={(event) => this.handleNuevoComentarioChange(event, nota._id)}
                    />

                    <select
                      className="form-select mb-2"
                      name="autor"
                      value={this.state.nuevosComentarios[nota._id]?.autor || ''}
                      onChange={(event) => this.handleNuevoComentarioChange(event, nota._id)}
                    >
                      <option value="">Selecciona un usuario</option>
                      {this.state.usuarios.map((usuario) => (
                        <option key={usuario._id} value={usuario.nombre}>
                          {usuario.nombre}
                        </option>
                      ))}
                    </select>

                    <button
                      className="btn btn-primary btn-sm ms-2 rounded-pill"
                      onClick={() => this.handleAgregarComentario(nota._id)}
                    >
                      Agregar Comentario
                    </button>
                  </div>
                </div>
                {/* Fin de la sección de comentarios */}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}