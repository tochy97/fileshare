import React,{Component,useState } from 'react';
import axios from 'axios';

export class CreateGroup extends Component{
    state = {
        groupname: '',
        description: '',
        creator: '',
        users: '',
        admin: '',
      };

    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
    };
    
    handleSubmit = e => {
        e.preventDefault();
        axios.get('http://127.0.0.1:8000/core/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            .then(user => {
                this.state.creator = user.data.id;
                this.state.users = user.data.id;
                this.state.admin = user.data.id;
                console.log(this.state.creator);
                let form_data = new FormData();
                form_data.append('groupname', this.state.groupname);
                form_data.append('description', this.state.description);
                form_data.append('creator', this.state.creator);
                form_data.append('users', this.state.users);
                form_data.append('admin', this.state.admin);
                axios.post('http://localhost:8000/core/groups/', form_data, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `JWT ${localStorage.getItem('token')}`
                        }
                    })
                    .then(res => {
                        console.log(res.data);
                    })
                    .catch(err => console.log(err));
            });
    };
    
    render(){
        return (
            <div className="base-container">
                <div className="content">
                    <form className="textforms">
                        <h4>Create Group</h4>
                        <input type="text" className = "textfield" placeholder="Group Name" id="groupname" value={this.state.groupname} onChange={this.handleChange} required/>
                            <textarea type="text" className='bigtextfield' placeholder='Description' id='description' value={this.state.description} onChange={this.handleChange} required/>
                        <button className="button" onClick={this.handleSubmit} >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    }

}