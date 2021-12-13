import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';
import { Button, Card, Form } from 'react-bootstrap';

class Signup extends React.Component {
  state = {
    username: '',
    password: '',
    cpassword: '',
    first_name: '',
    last_name: '',
    email: '',

  };

  handle_change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      <div className='content'>
          <Form className='p-4 mt-4' onSubmit={e => this.props.handle_signup(e, this.state)}>
            <Divider><h1>Sign Up</h1></Divider>
            <Form.Group>
              <Form.Control type="text" name="username" className='mt-4' placeholder="Username" value={this.state.username} onChange={this.handle_change} required/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="text" name="first_name" className='mt-4' placeholder="First Name" value={this.state.first_name} onChange={this.handle_change} required/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="text" name="last_name" className='mt-4' placeholder="Last Name" value={this.state.last_name} onChange={this.handle_change} required/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="email" name="email" className='mt-4' placeholder="Email" value={this.state.email} onChange={this.handle_change} required/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="password" name="password" className='mt-4' placeholder="Password" value={this.state.password} onChange={this.handle_change} required/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="password" name="cpassword" className='mt-4' placeholder="Confirm Password" value={this.state.cpassword} onChange={this.handle_change} required/>
            </Form.Group>
            <Button type="submit" variant="dark" className='w-100 mt-3' type="submit">Submit</Button>
          </Form>
      </div>
    );
  }
}

export default Signup;

Signup.propTypes = {
  handle_signup: PropTypes.func.isRequired
};