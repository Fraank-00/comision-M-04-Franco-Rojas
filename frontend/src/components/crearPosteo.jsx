import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function CrearPosteo() {
  // Obtener el parámetro de la URL
  const { id } = useParams();
  
  // Estado inicial del componente
  const [state, setState] = useState({
    titulo: '',
    contenido: '',
    fecha: '',
    selectedUserId: '',
    usuarios: [],
    editar: false,
    postId: '',
  });

  // Efecto al cargar el componente o cuando cambia el parámetro 'id'
  useEffect(() => {
    obtenerListaUsuarios(); // Obtener la lista de usuarios al cargar el componente
    if (id) {
      setState((prevState) => ({ ...prevState, editar: true, postId: id }));
      obtenerDatosPost(id); // Obtener los datos del post si se está editando
    }
  }, [id]);

  // Obtener la lista de usuarios desde la API
  const obtenerListaUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/usuarios');
      setState((prevState) => ({ ...prevState, usuarios: response.data }));
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
    }
  };

  // Obtener los datos del post desde la API
  const obtenerDatosPost = async (postId) => {
    try {
      const response = await axios.get(`http://localhost:3000/notas/${postId}`);
      const { titulo, contenido, fecha, autor } = response.data;
      setState((prevState) => ({
        ...prevState,
        titulo,
        contenido,
        fecha: fecha.substring(0, 10),
        selectedUserId: autor,
      }));
    } catch (error) {
      console.error('Error al obtener datos del posteo:', error);
    }
  };

  // Manejar cambios en los inputs del formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  // Manejar cambios en la selección de usuario
  const handleUserChange = (event) => {
    setState((prevState) => ({ ...prevState, selectedUserId: event.target.value }));
  };

  // Crear o editar un posteo
  const handleCrearPost = async () => {
    const { editar, postId } = state;

    try {
      // Validar que se haya seleccionado un usuario
      if (!state.selectedUserId) {
        console.error('Selecciona un usuario antes de crear el posteo.');
        return;
      }

      const posteo = {
        usuarioId: state.selectedUserId,
        titulo: state.titulo,
        contenido: state.contenido,
        fecha: state.fecha,
        autor: state.selectedUserId,
      };

      // Crear o editar el posteo según la condición
      if (editar) {
        await axios.put(`http://localhost:3000/notas/${postId}`, posteo);
      } else {
        await axios.post('http://localhost:3000/notas', posteo);
      }

      window.location.href = '/'; // Redirigir al inicio después de crear/editar el posteo
    } catch (error) {
      console.error('Error al crear/editar un posteo:', error);
    }
  };

  // Renderizar el componente
  return (
    <div className="col-6">
      <div className="card card-body">
        <Form>
          {/* Campos del formulario */}
          <Form.Group className="mb-3" controlId="formBasicTitulo">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Escribir Título"
              name="titulo"
              value={state.titulo}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicContenido">
            <Form.Label>Contenido</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Escribir Contenido"
              name="contenido"
              value={state.contenido}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicFecha">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              name="fecha"
              value={state.fecha}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicUser">
            <Form.Label>Seleccionar Usuario</Form.Label>
            <Form.Select
              value={state.selectedUserId}
              onChange={handleUserChange}
            >
              <option value="">Selecciona un usuario</option>
              {state.usuarios.map((usuario) => (
                <option key={usuario._id} value={usuario.id}>
                  {usuario.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {/* Botón para crear o editar el posteo */}
          <Button
            variant="primary"
            type="button"
            onClick={handleCrearPost}
          >
            {state.editar ? 'Editar Post' : 'Crear Post'}
          </Button>
        </Form>
      </div>
    </div>
  );
}
