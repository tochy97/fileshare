import React,{Component} from 'react';
import axios from 'axios';
import { Table, Alert, Button } from 'react-bootstrap';

export class ViewGroups extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: null ,
            data: [], 
            usergroup: null,
            error: '',
            };
        this.fetchData = this.fetchData.bind(this);
    }
  
    componentDidMount(){
        this.fetchData();
    }

    fetchData(){
        axios.get('http://127.0.0.1:8000/core/current_user/', {
            headers: {
              Authorization: `JWT ${localStorage.getItem('token')}`,
            }
        })
        .then((user) => {
            this.setState({ user: user.data,error: '',});
            axios.get('http://127.0.0.1:8000/core/groups/', {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                }
            })
            .then((groups) => {
                this.setState({
                    data:groups.data, 
                    error:''
                })
                this.setState({ user: user.data,error: '',});
                axios.get(`http://127.0.0.1:8000/core/usergroup/${user.data.id}/`, {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    }
                })
                .then((ug) =>{
                    this.setState({ usergroup: ug.data.group,error:'',});
                })
                .catch((err) => {   
                    this.setState({ error: err.message,});
                    if(err.response.status==404){
                        this.setState({ error:'Your account is not confirmed, Confrim in home page',});
                    }
                });  
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

    handleJoin = (e, group) => {
        e.preventDefault();
        this.setState({ error: '',})
        let group_data = new FormData();
        let old = this.state.usergroup;
        old.push(old)
        group_data.append('user',this.state.user.id)
        group_data.append('group',old)
        axios.put(`http://127.0.0.1:8000/core/usergroup/${this.state.user.id}/`, group_data, {
            headers:{
                Authorization: `JWT ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        })
        .then((res) =>{
            console.log(res.data)
        })
        .catch((err) =>{
            this.setState({
                error:err.message,
            })
        })
    }

    render(){
        const groupData=this.state.data;
        
        const row=groupData.map((group)=>
            <tr className="table-dark" key={group.id}>
                <td>{group.id}</td>
                <td>{group.name}</td>
                <td>{group.description}</td>
                <td>
                    <Button value={group.id} className="form-control" onClick={e =>this.handleJoin(e, group)} >
                        Join
                    </Button>
                </td>
            </tr>
        );
        return (
            <>
            { this.state.error && <Alert variant="danger">{this.state.error}</Alert> }
            { this.state.user 
                ?
                    <>
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
                    </>
                :
                    <>
                        <h1>You are not logged in</h1>
                    </>
            }
            </>
        )
    }
}