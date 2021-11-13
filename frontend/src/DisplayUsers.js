import React,{Component} from 'react';
import { Table } from 'react-bootstrap';

export class DisplayUsers extends Component{
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
        const groupData=this.state.data;
        const row=groupData.map((users)=>
            <tr className="table-dark" key={users.id}>
                <td>{users.id}</td>
                <td>{users.username}</td>
                <td>{users.data_added}</td>
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