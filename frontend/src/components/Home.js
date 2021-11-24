import React,{Component,useState } from 'react';
import Divider from '@mui/material/Divider';
import axios from 'axios';


export class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            data: [], 
            };
        this.fetchData = this.fetchData.bind(this);
    }
  
    componentDidMount(){
        this.fetchData();
    }

    fetchData(){
        axios
            .get('http://127.0.0.1:8000/core/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                }
            }).then((user) => {
        
                this.state.user = user.data;
                axios
                    .get('http://127.0.0.1:8000/core/posts/', {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `JWT ${localStorage.getItem('token')}`,
                    }
                    }).then((post) => {
                
                    this.state.data = post.data;
                    console.log(this.state);
                    })  
            })  
    }

    render(){
        const postData=this.state.data;
        return (
            <div className="base-container">
                <div className="feed">
                    <form className="displayform">
                        <Divider><h4>Home</h4></Divider>
                    </form>
                </div>
            </div>
        );
    }
}