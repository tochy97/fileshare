import React,{Component} from 'react';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import {useTable} from 'react-table';

export class DisplayUsers extends Component{
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
            })
            .then((user) => {
        
                this.state.user = user.data;
                axios
                    .get('http://127.0.0.1:8000/core/users/', {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `JWT ${localStorage.getItem('token')}`,
                    }
                    })
                    .then((users) => {
                
                    this.state.data = users.data;
                    console.log(this.state);
                    })  
            })  
    }

    render(){
        const groupData=this.state.data;
        const row=groupData.map((users)=>
            <tr className="table-dark" key={users.id}>
                <td>{users.id}</td>
                <td>{users.username}</td>
                <td>{users.date_joined}</td>
            </tr>
        );
        return (
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>Date Added</th>
                        </tr>
                    </thead>
                    <tbody>
                        {row}
                    </tbody>
                </Table>
            </div>
        )
    }
}