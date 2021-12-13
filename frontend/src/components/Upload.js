import React,{Component} from 'react';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { Button, Card, Form, Alert } from 'react-bootstrap';

export class Upload extends Component{
  constructor(props) {
      super(props);
      this.state = {
        user: null,
        title: '',
        description: '',
        file: null,
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
        this.setState({ user: user.data, error:''});
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

  handlefileChange = (e) => {
    this.setState({
      file: e.target.files[0]
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.user)
    let form_data = new FormData();
    form_data.append('creator', this.state.user.id);
    form_data.append('file', this.state.file);
    form_data.append('title', this.state.title);
    form_data.append('description', this.state.description);
    console.log(this.state);
    axios.post('http://127.0.0.1:8000/core/posts/', form_data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `JWT ${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      this.setState({error:'',})
      alert("Upload Successful");
    })
    .catch(err => {
      this.setState({ error: err.message,});
    });
  };

  
  render(){
    return (
      <div className='content'>
      { this.state.error && <Alert variant="danger">{this.state.error}</Alert> }
      { this.state.user 
        ? <Card className='p-2'>
            <Form onSubmit={this.handleSubmit}>
              <Divider><h4>Upload File</h4>  </Divider>
              <Form.Group>
                <Form.Control type="file" id='file' className='fileinput' className='mt-3' onChange={this.handlefileChange} required/>
              </Form.Group>
              <Form.Group>
                <Form.Control type="text" className='mt-3' placeholder='Title' id='title' value={this.state.title} onChange={this.handleChange} required/>
              </Form.Group>
              <Form.Group>
                <textarea type="text" className='form-control mt-3' placeholder='Description' id='description' value={this.state.description} onChange={this.handleChange} required/>
              </Form.Group>
              <Button type="submit" variant="dark" className='w-100 mt-3'>Submit</Button>
            </Form>
          </Card>
          :
            <>
              <Alert variant="danger">Session expired</Alert>
            </>
      }
      </div>
    );
  }
}