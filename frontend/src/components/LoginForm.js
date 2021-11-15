import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';

class LoginForm extends React.Component {
  state = {
    username: '',
    password: ''
  };

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.user.username
        });
      });
  };


  handle_change = e => {
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
        <div className='base-container'>
            <div className='content'>
                <form className='textforms' onSubmit={e => this.props.handle_login(e, this.state)}>
                    <Divider><h1>Log In</h1></Divider>
                    <br />
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" className='textfield' value={this.state.username} onChange={this.handle_change}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" className='textfield' value={this.state.password} onChange={this.handle_change}/>
                    <input type="submit" className='button'/>
                </form>
            </div>
        </div>
    );
  }
}

export default LoginForm;
