import React from 'react';
import PropTypes from 'prop-types';

function Nav(props) {
  const logged_out_nav = (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <a className="navbar-brand" href="#">File Share</a>
                <ul className="navbar-nav me-auto">
                    <li className="nav-item" >
                        <a className="nav-link" onClick={() => props.display_form('login')}>Login</a>
                    </li>
                    <li >
                        <a className="nav-link" onClick={() => props.display_form('signup')}>Signup</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  );

  const logged_in_nav = (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <a className="navbar-brand" onClick={() => props.display_form('home')} >Home</a>
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item" >
                            <a className="nav-link" onClick={() => props.display_form('upload')}>Upload File</a>
                        </li>
                        <li className="nav-item" >
                            <a className="nav-link" onClick={() => props.display_form('viewgroup')}>View Group</a>
                        </li>
                        <li className="nav-item" >
                            <a className="nav-link" onClick={() => props.display_form('creategroup')}>Create Group</a>
                        </li>
                        <li className="nav-item" >
                            <a className="nav-link" onClick={() => props.display_form('viewuser')}>View User</a>
                        </li>
                        <li className="nav-item" >
                            <a className="nav-link" onClick={props.handle_logout}>Logout</a>
                        </li>
                    </ul>
            </div>
        </div>
    </nav>
  );
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};