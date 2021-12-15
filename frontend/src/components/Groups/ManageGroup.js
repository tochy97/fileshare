import React,{Component} from 'react';
import axios from 'axios';
import { Table, Alert } from 'react-bootstrap';

export class ManageGroup extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            data: [], 
            error: '',
            };
        this.fetchData = this.fetchData.bind(this);
    }
  
    componentDidMount(){
        this.fetchData();
    }

    fetchData(){
        axios.get('http://127.0.0.1:8000/core/users/', {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `JWT ${localStorage.getItem('token')}`,
            }
        })
        .then((users) => {
            this.setState({data:users.data, error:''})
            axios.get('http://127.0.0.1:8000/core/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                }
            })
            .then((user) => {
                this.setState({user:user.data, error:''})
            })  
            .catch((err) => { 
                this.setState({ error: err.message,});
            });
        })  
        .catch((err) => { 
            this.setState({ error: err.message,});
            if(err.response.status==401){
                localStorage.removeItem('token');
                this.setState({ error:'Refresh Page',});
            }
        });
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
            <>
            { this.state.error && <Alert variant="danger">{this.state.error}</Alert> }
            { this.state.user 
                ?
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
                :
                    <>
                        <h1>You are not logged in</h1>
                    </>
            }
            </>
        )
    }
}