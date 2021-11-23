import React,{Component} from 'react';
import Divider from '@mui/material/Divider';
import axios from 'axios';

export class Upload extends Component{
  state = {
    title: '',
    description: '',
    file: null
  };

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
    console.log(this.state);
    let form_data = new FormData();
    form_data.append('file', this.state.file);
    form_data.append('title', this.state.title);
    form_data.append('description', this.state.description);
    let url = 'http://localhost:8000/core/posts/';
    axios.post(url, form_data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `JWT ${localStorage.getItem('token')}`,
      }
    })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => console.log(err))
  };
  
  render(){
    return (
      <div className='content'>
        <form className='textforms' onSubmit={this.handleSubmit}>
          <Divider><h4>Upload File</h4>  </Divider>
          <br />
          <input type="text" className='textfield' placeholder='Title' id='title' value={this.state.title} onChange={this.handleChange} required/>
          <input type="text" className='textfield' placeholder='Description' id='description' value={this.state.description} onChange={this.handleChange} required/>
          <label>
            <input type="file" id='file' className='fileinput' onChange={this.handlefileChange} required/>
          </label>
          <button type="submit" className='button'>Submit</button>
        </form>
      </div>
    );
  }
}