import React,{Component,useState } from 'react';


export class CreateGroup extends Component{

    constructor(){
        super();
        this.state={
            groupname: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.changeHandler=this.changeHandler.bind(this);
        this.submitForm=this.submitForm.bind(this);
    }

    changeHandler(){
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    
    handleChange = (e) => {
        setValue(e.target.value);
    };

    submitForm(){
        fetch('http://127.0.0.1:8000/core/groups/',{
            method:'POST',
            body:JSON.stringify(this.state),
            headers:{
                Authorization: `JWT ${localStorage.getItem('token')}`,
                'Content-type': 'application/json; charset=UTF-8',
        },
    })

        .then(response=>response.json())
        .then((data)=>console.log(data));
        this.setState=({
            groupname: "",
        });
    }

    render(){
        return (
            <div className="base-container">
                <div className="content">
                    <form className="textforms">
                        <h4>Create Group</h4>
                        <input type="text" onChange={this.changeHandler} className = "textfield" name="groupname" required placeholder="Group Name" value={this.state.groupname}/>
                        <button className="button" onClick={this.submitForm} >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    }

}