'use client';

import React, { useState, useContext } from 'react';
import { Navbar, Nav, Container, Offcanvas, Button, Form, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { SearchContext } from '../utils/context/SearchContext'; // Import SearchContext

function AppNavbar() {
  const { user } = useAuth();
  const { setSearchQuery } = useContext(SearchContext); // Access the global search context
  const [localQuery, setLocalQuery] = useState(''); // Local state for the search bar

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setLocalQuery(query);
    setSearchQuery(query); // Update the global search query
  };

  return (
    <Navbar expand={false} className="custom-navbar" variant="light">
      <Container fluid>
        {/* Hamburger Menu */}
        <Navbar.Toggle aria-controls="offcanvasNavbar" className="me-auto custom-hamburger" style={{ marginLeft: '10px' }} />

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

        {/* Search Bar */}
        <Form className="d-flex align-items-center me-3" style={{ position: 'relative', width: '200px' }}>
          {/* FontAwesome Icon */}
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '10px',
              transform: 'translateY(-50%)',
              color: 'white',
              pointerEvents: 'none',
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>

          {/* FormControl Input */}
          <FormControl
            type="search"
            value={localQuery}
            onChange={handleSearchChange} // Update the global search query
            className="custom-search-bar"
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: '1px solid white',
              borderRadius: '4px',
              paddingLeft: '30px', // Add padding to the left to account for the icon
            }}
          />
        </Form>

        {/* Sign Out Button */}
        <Button className="signOutBtn" onClick={signOut} style={{ marginRight: '10px' }}>
          Sign Out
        </Button>

        {/* Hamburger Menu Content */}
        <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="start" style={{ backgroundColor: 'rgba(64, 174, 185, 0.3)', color: 'white' }}>
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
              <Nav.Link href={`/Profile/${user.uid}`} className="text-light">
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
