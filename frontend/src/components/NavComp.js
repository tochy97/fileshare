import React from 'react';
import PropTypes from 'prop-types';
import { Container, Navbar, Nav } from 'react-bootstrap';

function NavComp(props) {
  const logged_out_nav = (
    <Navbar  bg="light" expand="lg">
        <Container className="fluid">
            <a className="navbar-brand" onClick={() => props.display_form('home')} >Home</a>  
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Item>
                        <a className="nav-link" onClick={() => props.display_form('login')}>Login</a>
                    </Nav.Item>
                    <Nav.Item >
                        <a className="nav-link" onClick={() => props.display_form('signup')}>Signup</a>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  );

  const logged_in_nav = (
    <Navbar  bg="light" expand="lg">
        <Container className="fluid">
            <a className="navbar-brand" onClick={() => props.display_form('home')} >Home</a>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Item>
                        <a className="nav-link" onClick={() => props.display_form('upload')}>Upload File</a>
                    </Nav.Item>
                    <Nav.Item >
                        <a className="nav-link" onClick={() => props.display_form('viewgroup')}>View Group</a>
                    </Nav.Item>
                    <Nav.Item >
                        <a className="nav-link" onClick={() => props.display_form('creategroup')}>Create Group</a>
                    </Nav.Item>
                    <Nav.Item >
                        <a className="nav-link" onClick={() => props.display_form('viewuser')}>View User</a>
                    </Nav.Item>
                    <Nav.Item >
                        <a className="nav-link" onClick={props.handle_logout}>Logout</a>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  );
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default NavComp;

NavComp.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};