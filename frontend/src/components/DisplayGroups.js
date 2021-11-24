import React,{Component} from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

export class DisplayGroups extends Component{
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
                    .get('http://127.0.0.1:8000/core/groups/', {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `JWT ${localStorage.getItem('token')}`,
                    }
                    })
                    .then((groups) => {
                
                    this.state.data = groups.data;
                    console.log(this.state);
                    })  
            })  
    }

    render(){
        const groupData=this.state.data;
        const row=groupData.map((group)=>
            <tr className="table-dark" key={group.id}>
                <td>{group.id}</td>
                <td>{group.groupname}</td>
                <td>{group.data_added}</td>
            </tr>
        );
        return (
            <div className="base-container">
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Group ID</th>
                            <th>Group Name</th>
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