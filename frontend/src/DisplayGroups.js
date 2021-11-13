import React,{Component} from 'react';
import { Table } from 'react-bootstrap';

export class DisplayGroups extends Component{
    constructor(){
        super();
        this.state={
            data:[]
        };
    }

    fetchData(){
        fetch('http://localhost:8000/groups/')
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
        const groupData=this.state.data;
        const row=groupData.map((group)=>
            <tr className="table-dark" key={group.id}>
                <td>{group.id}</td>
                <td>{group.groupname}</td>
                <td>{group.users}</td>
                <td>{group.admin}</td>
                <td>{group.data_added}</td>
            </tr>
        );
        return (
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Group ID</th>
                            <th>Group Name</th>
                            <th>Users (By ID)</th>
                            <th>Admin (By ID)</th>
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