import React,{Component} from 'react';
import {Form} from 'react-bootstrap';
import logo from './rotclogo.png'

export class Login extends Component{
    render(){
        return (
            <div className="base-container">
                <div className="content">
                        <div className="rotclogo">
                            <img src= {logo} alt = ""/>
                        </div>
                        <div className="loginform">
                            <input type="text" className = "textfield" name="email" required placeholder="Email"/>
                            <input type="password" className = "textfield" name="password" required placeholder="Password"/>
                            <button className="button">
                                Login
                            </button>
                        </div>
                    </div>
            </div>
        );
    }
}

export default Login;