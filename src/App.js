import React, { Component } from 'react';
import { Container, Navbar, NavDropdown } from 'react-bootstrap'
import ConsolidatedWizard from './ConsolidatedWizard'
import logo from './gbors-logo.png'
import './App.css'

class App extends Component {
  render(){
    return(
      <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand><img src={logo} height="20" width="80"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <NavDropdown title="External Links" id="basic-nav-dropdown">
              <NavDropdown.Item >GBO Home</NavDropdown.Item>
              <NavDropdown.Item >GBO Science Center</NavDropdown.Item>
              <NavDropdown.Item >Field Trip Guide</NavDropdown.Item>
              <NavDropdown.Item >Visitor Registration</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Reservations" id="basic-nav-dropdown">
          </NavDropdown>
          <NavDropdown title="Management" id="basic-nav-dropdown">
          </NavDropdown>
          <NavDropdown title="Accounting" id="basic-nav-dropdown">
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>

      <Container className="form-container">
        <ConsolidatedWizard/>
      </Container>
      </>
    )
  }
}

export default App;
