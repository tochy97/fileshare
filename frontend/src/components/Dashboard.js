import React, { Component } from 'react';
import { Redirect } from "react-router";
import Divider from '@mui/material/Divider';

export class Dashboard extends Component{
    state = {
        redirect: false
    }
    redirectHandler = () => {
        this.setState({ redirect: true })
        this.renderRedirect();
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/UploadForm' />
        }
    }
    render(){
        return (
            <div className='base-container'>
                <div className='dash-content'>
                    <button className="button" onClick={this.redirectHandler}>Upload File</button>
                    {this.renderRedirect()}
                </div>
            </div>
        );
    }
}