import React from 'react';
import PropTypes from 'prop-types';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

function NavComp(props) {
    const logged_out_nav = (
        <Navbar  bg="light" expand="lg">
            <Container className="fluid">
                <Navbar.Brand style={{cursor: "pointer",}} onClick={() => props.display_form('login')} >Home</Navbar.Brand>  
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Login/Signup">
                                <NavDropdown.Item onClick={() => props.display_form('login')}>Login</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => props.display_form('signup')}>Signup</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

    const logged_in_nav = (
        <Navbar  bg="light" expand="lg">
            <Container className="fluid">
                <Navbar.Brand style={{cursor: "pointer",}} onClick={() => props.display_form('home')} >Home</Navbar.Brand>  
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Posts">
                            <NavDropdown.Item onClick={() => props.display_form('createpost')}>Create Post</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => props.display_form('managepost')}>Manage Post</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Groups">
                            <NavDropdown.Item onClick={() => props.display_form('viewgroup')}>View Group</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => props.display_form('managegroup')}>Manage Group</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => props.display_form('creategroup')}>Create Group</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Item >
                            <Nav.Link onClick={props.handle_logout}>Logout</Nav.Link>
                        </Nav.Item>
                        <Nav.Item >
                            <a className="nav-link">{'Hello, ' + props.username}</a>
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
  handle_logout: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
};