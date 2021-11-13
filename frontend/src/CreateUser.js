import React,{Component,useState } from 'react';
import PropTypes from 'prop-types';


export class CreateUser extends Component{

    state = {
        username: '',
        password: ''
    };
    
    handle_createuser = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/core/users/', {
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
          username: json.username
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
                    <form className="textforms" onSubmit={e => this.props.handle_createuser(e, this.state)}>
                        <h4>Sign Up</h4>
                        <input type="text" onChange={this.handle_change} className = "textfield" name="username" required placeholder="Username" value={this.state.username}/>
                        <input type="password" onChange={this.handle_change} className = "textfield" name="password" required placeholder="Password" value={this.state.password}/>
                        <input type="submit" className="button"/>
                    </form>
                </div>
            </div>
        )
    }

}
