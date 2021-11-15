import React,{Component} from 'react';
import { Table } from 'react-bootstrap';

export class DisplayGroups extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        };
    }

    fetchData(){
        fetch('http://127.0.0.1:8000/core/groups/', {
            headers: {
              Authorization: `JWT ${localStorage.getItem('token')}`
            }
          })
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