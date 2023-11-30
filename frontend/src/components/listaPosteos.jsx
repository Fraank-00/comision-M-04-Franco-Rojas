// Importar las dependencias necesarias
import React, { Component } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

// Crear y exportar el componente ListaPosteos
export default class ListaPosteos extends Component {
  // Definir el estado inicial del componente
  state = {
    notas: [],
  };

  // Obtener las notas al montar el componente
  componentDidMount() {
    this.getNotas();
  }

  // Obtener las notas desde el servidor
  async getNotas() {
    try {
      const resp = await axios.get('http://localhost:3000/notas');
      this.setState({ notas: resp.data });
    } catch (error) {
      console.error('Error al obtener Posteos:', error);
    }
  }

  // Eliminar una nota por su ID
  Eliminarnota = async (id) => {
    await axios.delete('http://localhost:3000/notas/' + id);
    this.getNotas();
  };

  // Renderizar el componente
  render() {
    return (
      <div className="row">
        {/* Iterar sobre cada nota y mostrarla en una tarjeta */}
        {this.state.notas.map((nota) => (
          <div className="col-md-4 p-2" key={nota._id}>
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h5>{nota.titulo}</h5>
                {/* Enlace para editar la nota */}
                <Link to={'/edit/'+ nota._id} className='btn btn-secondary'>
                  Editar
                </Link>
              </div>
              <div className="card-body">
                <p>{nota.contenido}</p>
                <p>{nota.autor}</p>
                <p>{format(nota.fecha)}</p>
              </div>
              <div className="card-footer">
                {/* Botón para eliminar la nota */}
                <button className='btn btn-danger' onClick={() => this.Eliminarnota(nota._id)}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
