'use client';

import React from 'react';
import { Navbar, Nav, Container, Offcanvas, Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';

function AppNavbar() {
  return (
    <Navbar expand={false} style={{ backgroundColor: '#343a40' }} variant="dark">
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

        <Button variant="outline-light" onClick={signOut} style={{ marginRight: '10px' }}>
          Sign Out
        </Button>

        {/* Hamburger Menu Content */}
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
              <Nav.Link href="/Posts/New" className="text-light">
                Add Request
              </Nav.Link>
              {/* Updated Links for Dynamic Routing */}
              <Nav.Link href="/Posts/Tags/Movies" className="text-light">
                Movies
              </Nav.Link>
              <Nav.Link href="/Posts/Tags/Shows" className="text-light">
                Shows
              </Nav.Link>
              <Nav.Link href="/Posts/Tags/Books" className="text-light">
                Books
              </Nav.Link>
              <Nav.Link href="/Posts/Tags/Music" className="text-light">
                Music
              </Nav.Link>
              <Nav.Link href="/Posts/Tags/Podcasts" className="text-light">
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

export default AppNavbar;
