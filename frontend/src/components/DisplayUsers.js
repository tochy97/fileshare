import React,{Component} from 'react';
import { Table } from 'react-bootstrap';

var temp = '';

export class DisplayUsers extends Component{
    constructor(){
        super();
        this.state={
            username: '',
            data:[]
        };
    }

    fetchData(){
        fetch('http://127.0.0.1:8000/core/users/', {
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

    fetchUser(){
        fetch('http://127.0.0.1:8000/core/current_user/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
          }
        })
          .then(res => res.json())
          .then(json => {
            this.setState({ username: json.username });
          });
          temp = this.state.username;
          console.log(temp + 'hi' + this.state.username + 'hi');
    }

    componentDidMount(){
        this.fetchUser();
        this.fetchData();
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
                hi {temp}
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