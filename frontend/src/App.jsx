import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/index.css';

import NavBar from './components/navegacion';
import Posteos from './components/listaPosteos';
import CrearPosteo from './components/crearPosteo';
import CrearUsuario from './components/crearUsuario';
import InicioSesion from './components/InicioSesion';
import CerrarSesion from './components/CerrarSesion';



function App() {
  // Estado para almacenar el token y el usuario
  const [token, setToken] = useState(null);
  const [usuario, setUsuario] = useState(null);

  // Función para actualizar el estado después del inicio de sesión
  const actualizarUsuarioYToken = (nuevoToken, nuevoUsuario) => {
    setToken(nuevoToken);
    setUsuario(nuevoUsuario);
  };

  const handleCerrarSesion = () => {
    setToken(null, () => {
      setUsuario(null);
      console.log('Token después de cerrar sesión:', token); // Aquí puedes realizar acciones después de que el estado se ha actualizado
    });
  };
  
  return (
    <Router>
      {/* Pasa isAuthenticated como prop al componente NavBar */}
      <NavBar isAuthenticated={Boolean(token)} />
      <div className="container p-4">
        {/* Definición de rutas */}
        <Routes>
          <Route
            path='/'
            element={<Posteos token={token} usuario={usuario} />} 
          />
          <Route path='/edit/:id' element={<CrearPosteo />} />
          <Route path='/crear' element={<CrearPosteo />} />
          <Route
            path='/registro'
            element={<CrearUsuario actualizarUsuarios={actualizarUsuarioYToken} />}
          />
          <Route
            path='/login'
            element={<InicioSesion actualizarUsuarios={actualizarUsuarioYToken} />}
          />
      
          {token && (
            <Route
              path='/cerrar-sesion'
              element={<CerrarSesion cerrarSesion={handleCerrarSesion} />}
            />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
