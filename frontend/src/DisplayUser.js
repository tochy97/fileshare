import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import { Table } from 'react-bootstrap';

export class DisplayUser extends Component{
    constructor(){
        super();
        this.state={
            data:[]
        };
    }

    fetchData(){
        fetch('http://localhost:8000/users/')
        .then(response=>response.json())
        .then((data)=>{
            this.setState({
                data:data
            });
        });
    }

    componentDidMount(){
        this.fetchData();
    }

    render(){
        const userData=this.state.data;
        const row=userData.map((user)=>
            <tr className="table-dark" key={user.id}>
                <td>{user.id}</td>
                <td>{user.fname}</td>
                <td>{user.lname}</td>
                <td>{user.gendre}</td>
                <td>{user.mslevel}</td>
                <td>{user.company}</td>
                <td>{user.email}</td>
                <td>{user.data_added}</td>
            </tr>
        );
        return (
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>User ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gendre</th>
                        <th>MS Level</th>
                        <th>Company</th>
                        <th>Email</th>
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