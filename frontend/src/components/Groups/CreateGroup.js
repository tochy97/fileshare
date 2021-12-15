import React,{Component,useState } from 'react';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import { Button, Card, Form, Alert } from 'react-bootstrap';

export class CreateGroup extends Component{
      constructor(props) {
          super(props);
          this.state = {
            user: null,
            usergroup: null,
            name: '',
            description: '',
            creator: '',
            users: '',
            admins: '',
            error:'',
          };
          this.fetchData = this.fetchData.bind(this);
      }
    
      componentDidMount(){
        this.fetchData();
      }
    
      fetchData(){
        axios.get('http://127.0.0.1:8000/core/current_user/', {
            headers: {
              Authorization: `JWT ${localStorage.getItem('token')}`,
            }
        })
        .then((user) => {
            this.setState({ user: user.data,error: '',});
            axios.get(`http://127.0.0.1:8000/core/usergroup/${user.data.id}/`, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            })
            .then((ug) =>{
                this.setState({ usergroup: ug.data,error:'',});
                console.log(this.state)
            })
            .catch((err) => {   
                this.setState({ error: err.message,});
                if(err.response.status==404){
                    this.setState({ error:'Your account is not confirmed, Confrim in home page',});
                }
            });  
        })
        .catch((err) => {   
            this.setState({ error: err.message,});
            if(err.response.status==401){
                localStorage.removeItem('token');
                this.setState({ error:'Refresh Page',});
            }
        });  
      }

    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
    };
    
    handleSubmit = (e) => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('name', this.state.name);
        form_data.append('description', this.state.description);
        form_data.append('creator', this.state.user.id);
        form_data.append('admins', this.state.user.id);
        form_data.append('users', this.state.user.id);
        axios.post('http://localhost:8000/core/groups/', form_data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            this.setState({ error: '',});
            alert("Upload Successful");
        })
        .catch(err => {
            this.setState({ error: "Upload failed"});
        });
    };
    
    render(){
        return (
            <>
            { this.state.error && <Alert variant="danger">{this.state.error}</Alert> }
            { this.state.user         
                ? 
                    <Card className='p-5'>
                    <Form onSubmit={this.handleSubmit}>
                        <Divider><h4>Create Group</h4></Divider>
                        <Form.Group>
                            <Form.Control type="text" className='mt-3' placeholder="Group Name" id="name" value={this.state.name} onChange={this.handleChange} required/>
                        </Form.Group>
                        <Form.Group>
                            <textarea type="text" className='form-control mt-3' placeholder='Description' id='description' value={this.state.description} onChange={this.handleChange}required/>
                        </Form.Group>
                        <Button type="submit" variant="dark" className='w-100 mt-3'>Submit</Button>
                    </Form>
                </Card>
                :
                    <>
                        <h1>You are not logged in</h1>
                    </>
                }
            </>
        )
    }

}