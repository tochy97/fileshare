import React,{Component} from 'react';
import axios from 'axios';
import { Table, Alert, Button } from 'react-bootstrap';

export class ViewGroups extends Component{
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
        axios.get('http://127.0.0.1:8000/core/groups/', {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `JWT ${localStorage.getItem('token')}`,
            }
        })
        .then((groups) => {
            this.setState({data:groups.data})
            console.log(this.state);
            axios.get('http://127.0.0.1:8000/core/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                }
            })
            .then((user) => {
                this.setState({ user: user.data,});
                axios.get(`http://127.0.0.1:8000/core/usergroup/${user.data.id}/`, {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    }
                })
                .then((ug) =>{
                    this.setState({ usergroup: ug.data,});
                })
                .catch((err) => {   
                    this.setState({ error: err.response.message,});
                    if(err.response.status==404){
                        this.setState({ error:'Your account is not confirmed, Confrim in home page',});
                    }
                });   
            }) 
            .catch((err) => {   
                this.setState({ error: err.response.message,});
            });      
        })  
        .catch((err) => { 
            this.setState({ error: err.response.message,});
            if(err.response.status==401){
                localStorage.removeItem('token');
                this.setState({ error:'Refresh Page',});
            }
        });
    }

    handleJoin = (e, group) => {
        e.preventDefault();
        axios.get('http://127.0.0.1:8000/core/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
        })
        .then((user) => {
            axios.get(`http://127.0.0.1:8000/core/usergroup/${user.data.id}/`, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            })
            .then((usergroup) => { 
                let group_data = new FormData();
                let temp = usergroup.data.group;
                temp.push(group.id);
                group_data.append('user', user.data.id);
                group_data.append('group', temp);
                for (var value of group_data.values()) {
                   console.log(value);
                }
                axios.patch(`http://127.0.0.1:8000/core/usergroup/${user.data.id}/`, group_data,{
                    headers: {
                        Authorization: `JWT ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                })
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => { 
                    this.setState({ error: err.response.message,});
                });
            })
        })
        .catch((err) => {
            this.setState({ error: err.response.message,});
        });
    }

    render(){
        const groupData=this.state.data;
        
        const row=groupData.map((group)=>
            <tr className="table-dark" key={group.id}>
                <td>{group.id}</td>
                <td>{group.name}</td>
                <td>{group.description}</td>
                <td>
                    <button value={group.id} className="button" onClick={e =>this.handleJoin(e, group)} >
                        Join
                    </button>
                </td>
            </tr>
        );
        return (
            <div className="base-container">
            { this.state.error && <Alert variant="danger">{this.state.error}</Alert> }
            { this.state.user 
                ?
                    <Table className="py-2" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Group ID</th>
                                <th>Group Name</th>
                                <th>Description</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {row}
                        </tbody>
                    </Table>
                :
                    <>
                        <Alert variant="danger">Session expired</Alert>
                    </>
            }
            </div>
        )
    }
}