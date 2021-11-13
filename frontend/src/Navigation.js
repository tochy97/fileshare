import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';

export class Navigation extends Component{

    render(){
        return(
            <Navbar expand="lg" className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" >File Share</a> 
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <NavLink className="nav-link" exact activeClassName="nav-link active" to="/Login">
                        Login
                    </NavLink>
                    <NavLink className="nav-link" exact activeClassName="nav-link active" to="/CreateUser">
                        Create User
                    </NavLink>
                    <NavLink className="nav-link" exact activeClassName="nav-link active" to="/CreateGroup">
                        Create Group
                    </NavLink>
                    <NavLink className="nav-link" exact activeClassName="nav-link active" to="/DisplayGroups">
                        Display Groups
                    </NavLink>
                    <NavLink className="nav-link" exact activeClassName="nav-link active" to="/DisplayUsers">
                        Display Users
                    </NavLink>
                </Nav>
                </Navbar.Collapse>
                </div>
            </Navbar>
        )
    }
} 