import React from "react"
import Navbar from 'react-bootstrap/Navbar'; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

const Navibar = ( {user} ) => {
    return (
        <div id="navbar">
        <Navbar> 
          <Container>
            <Nav className="me-auto">
              <Nav.Link href="/">Home &nbsp;</Nav.Link>
              <Nav.Link href="/about">About &nbsp;</Nav.Link>
              <Nav.Link href="/recipyHub">Recipy-Hub &nbsp;</Nav.Link>
              <div>
              <Navbar.Text>
                Signed in as: {user}
              </Navbar.Text></div>
            </Nav>
          </Container>
        </Navbar>
      </div>
    )
}

export default Navibar;