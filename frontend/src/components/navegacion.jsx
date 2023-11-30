import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// Componente de clase para la barra de navegación
export default class NavBar extends Component {
  render() {
    return (
      <>
        <div>
          {/* Barra de navegación */}
          <Navbar bg="dark" data-bs-theme="dark">
            {/* Contenedor para la barra de navegación */}
            <Container>
              {/* Marca de la barra de navegación */}
              <Navbar.Brand href="/">ViajesApp</Navbar.Brand>

              {/* Enlaces de navegación en la barra de navegación */}
              <Nav className="ml-auto">
                <Nav.Link href="/">Posteos</Nav.Link>
                <Nav.Link href="/crear">Crear Post</Nav.Link>
                <Nav.Link href="/usuario">Crear Usuario</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </div>
      </>
    );
  }
}
