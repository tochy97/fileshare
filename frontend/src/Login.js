import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {Form} from 'react-bootstrap';
import logo from './rotclogo.png'

export class Login extends Component{
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
    render(){
        return (
            <div className="base-container">
                <div className="content">
                        <form className="textforms" onSubmit={e => this.props.handle_login(e, this.state)}>
                            <h4>Login</h4>
                            <input type="text" className = "textfield"  name="username" value={this.state.username} onChange={this.handle_change}required placeholder="Username"/>
                            <input type="password" className = "textfield" name="password" value={this.state.password} onChange={this.handle_change}required placeholder="Password"/>
                            <input type="submit" className="button"/>
                        </form>
                    </div>
            </div>
        );
    }
}

export default Login;