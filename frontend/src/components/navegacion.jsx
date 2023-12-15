import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link
import CerrarSesion from './CerrarSesion';

export default class NavBar extends Component {
  render() {
    // Supongamos que has pasado el estado de autenticación como prop (por ejemplo, isAuthenticated)
    const isAuthenticated = this.props.isAuthenticated;

    return (
      <>
        <div>
          {/* Barra de navegación */}
          <Navbar bg="dark" variant="dark">
            {/* Contenedor para la barra de navegación */}
            <Container>
              {/* Marca de la barra de navegación */}
              <Navbar.Brand as={Link} to="/">
                ViajesApp
              </Navbar.Brand>

              {/* Enlaces de navegación en la barra de navegación */}
              <Nav className="ml-auto">
                <Nav.Link as={Link} to="/">
                  Posteos
                </Nav.Link>
                <Nav.Link as={Link} to="/crear">
                  Crear Post
                </Nav.Link>
                {/* Verifica si el usuario está autenticado para mostrar el enlace de cierre de sesión */}
                {isAuthenticated && (
                  <Nav.Link as={Link} to="/cerrar-sesion">
                    Cerrar Sesión
                  </Nav.Link>
                )}
                {!isAuthenticated && (
                  <>
                    <Nav.Link as={Link} to="/registro">
                      Registro
                    </Nav.Link>
                    <Nav.Link as={Link} to="/login">
                      Login
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Container>
          </Navbar>
        </div>
      </>
    );
  }
}
