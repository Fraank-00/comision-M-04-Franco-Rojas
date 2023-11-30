import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/index.css'

import NavBar from './components/navegacion';
import Posteos from './components/listaPosteos';
import CrearPosteo from './components/crearPosteo';
import CrearUsuario from './components/crearUsuario';
import Login from './components/login'

function App() {
  return (
    <Router>
       <NavBar />
       <div className="conteiner p-4">
        {/* Definición de rutas */}
       <Routes>
        <Route path='/' element={<Posteos />} />
        <Route path='/edit/:id' element={<CrearPosteo />} />
        <Route path='/crear' element={<CrearPosteo />} />
        <Route path='/usuario' element={<CrearUsuario />} />
        <Route path='/login' element={<Login/>} />
       </Routes>
       </div> 
    </Router>
  );
}

export default App;
