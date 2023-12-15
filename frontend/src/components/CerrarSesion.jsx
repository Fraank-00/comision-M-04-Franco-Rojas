import React, { useState } from 'react';

const CerrarSesion = ({ cerrarSesion }) => {
  const [redireccionar, setRedireccionar] = useState(false);

  const handleCerrarSesion = async () => {
    localStorage.removeItem('token');
    setRedireccionar(true);
    cerrarSesion();
  };

  if (redireccionar) {
    window.location.href = "/login";
  }

  return (
    <button onClick={handleCerrarSesion}>Cerrar Sesión</button>
  );
};

export default CerrarSesion;
