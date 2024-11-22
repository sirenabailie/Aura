'use client';

import React from 'react';
import { Navbar, Nav, Container, Offcanvas, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function AppNavbar({ onSignOut }) {
  return (
    <Navbar
      expand={false}
      style={{ backgroundColor: '#343a40' }} // Navbar background
      variant="dark"
    >
      <Container fluid>
        {/* Hamburger Menu */}
        <Navbar.Toggle aria-controls="offcanvasNavbar" className="me-auto" style={{ marginLeft: '10px' }} />

        {/* Centered Brand */}
        <Navbar.Brand
          href="/"
          className="mx-auto"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
          }}
        >
          Aura
        </Navbar.Brand>

        {/* Sign-Out Button */}
        <Button variant="outline-light" onClick={onSignOut} style={{ marginRight: '10px' }}>
          Sign Out
        </Button>

        {/* Offcanvas (Hamburger Menu Content) */}
        <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="start" style={{ backgroundColor: '#343a40', color: 'white' }}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel" style={{ color: 'white' }}>
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              <Nav.Link href="/" className="text-light">
                Home
              </Nav.Link>
              <Nav.Link href="/add-request" className="text-light">
                Add Request
              </Nav.Link>
              <Nav.Link href="/movies" className="text-light">
                Movies
              </Nav.Link>
              <Nav.Link href="/shows" className="text-light">
                Shows
              </Nav.Link>
              <Nav.Link href="/books" className="text-light">
                Books
              </Nav.Link>
              <Nav.Link href="/music" className="text-light">
                Music
              </Nav.Link>
              <Nav.Link href="/podcasts" className="text-light">
                Podcasts
              </Nav.Link>
              <Nav.Link href="/profile" className="text-light">
                User Profile
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

AppNavbar.propTypes = {
  onSignOut: PropTypes.func.isRequired,
};

export default AppNavbar;
