import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InicioSesion = ({ actualizarUsuarios }) => {
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate(); // Hook para navegación

  const handleInicioSesion = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        nombre,
        contraseña,
      });

      // Verificar si hay datos en la respuesta antes de acceder a 'data'
      if (response.data) {
        actualizarUsuarios();

        // Redirigir al usuario después de iniciar sesión (puedes ajustar la ruta)
        navigate('/crear');
      } else {
        console.error('Error en el inicio de sesión: Respuesta sin datos');
      }
    } catch (error) {
      console.error('Detalles del error:', error.response?.data || 'No hay detalles disponibles');
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="card">
        <h2 className="col-6">Iniciar Sesión</h2>
        <label>Nombre de usuario:</label>
        <input type="text" className="form-control mb-3" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <label>Contraseña:</label>
        <input type="password" className="form-control mb-3" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
        <button className="btn btn-primary" onClick={handleInicioSesion}>Iniciar Sesión</button>
      </div>
    </div>
  );
};

export default InicioSesion;
