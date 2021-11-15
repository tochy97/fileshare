import React,{Component} from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

export class DisplayGroups extends React.Component{
    state = {
        id: '',
        groupname: '',
        users: '',
        admin: '',
        data_added: '',
    };
    componentDidMount(){
        this.fetchGroupData();
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
            <div className="base-container">
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
                <div className="content"></div>
            </div>
        )
    }
}

DisplayGroups.propTypes = {
    fetchGroupData: PropTypes.func.isRequired
};