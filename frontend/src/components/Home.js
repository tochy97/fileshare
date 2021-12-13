import React,{Component} from 'react';
import axios from 'axios';
import { Card, Row, Alert, Button } from 'react-bootstrap';
import { Divider } from '@mui/material';

export class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            data: [], 
            error: '',
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
                this.setState({
                    user:user.data,
                })
                axios.get('http://127.0.0.1:8000/core/posts/', {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `JWT ${localStorage.getItem('token')}`,
                    }
                    })
                    .then((post) => {
                        this.setState({
                            user:user.data.id,
                            data:post.data,
                        })
                        console.log(this.state);
                    }) 
                    .catch((err) =>{
                        this.setState({ error: err.message,});
                    })
            })  
            .catch((err) =>{
                this.setState({ error: err.message,});
                if(err.response.status==401){
                    localStorage.removeItem('token');
                    this.setState({ error:'Refresh Page',});
                }
            })
    }

    handleConfirm = (e) => {
        e.preventDefault();
        axios.get('http://127.0.0.1:8000/core/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                }
            })
            .then((user) => {
        
                this.state.user = user.data.id;
                let form_data = new FormData();
                form_data.append('user', this.state.user);
                axios.post('http://127.0.0.1:8000/core/usergroup/', form_data, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `JWT ${localStorage.getItem('token')}`,
                    }
                })
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => {
                    if (err.response.status==400) {
                        alert("You are aleady confirmed");
                    } else {
                        alert("Confirm failed");
                    }
                });
            })
            .catch((err) => {
                alert("Confirm failed");
            });
    }


    render(){
        const postData=this.state.data;
        return (
            <div className="base-container">
                <Row className="px-5 my-6 gap-5">
                    { this.state.user 
                    ?   <>
                            {postData.map((item,index) => (
                                    <Card className="col-md-5 mx-aut px-0" key={index}>
                                        <Card.Body>
                                            <Card.Title className="mt-3" ><Divider>{item.title}</Divider></Card.Title>
                                            <Card.Subtitle className="mt-3">{item.description}</Card.Subtitle>
                                            <Card.Subtitle className="mt-3">By: {item.creator.username}</Card.Subtitle>
                                            <Card.Img  className="mt-3 align-center" src={'.'+item.file} alt={item.title}></Card.Img>
                                        </Card.Body>
                                    </Card>
                            ))
                    }
                            <Button className="form-control" onClick={this.handleConfirm} >
                                Confirm Account
                            </Button>

                        </>
                    :
                        <>
                            <h1>You are not logged in</h1>
                        </>
                    }
    
                </Row>
            </div>
        );
    }
}