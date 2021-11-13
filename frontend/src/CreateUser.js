import React,{Component,useState } from 'react';


export class CreateUser extends Component{

    constructor(){
        super();
        this.state={
            id: "",
            fname: "",
            lname: "",
            email: "",
            gendre: "male",
            company:  "hhc",
            mslevel: 1
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
        fetch('http://localhost:8000/users/',{
            method:'POST',
            body:JSON.stringify(this.state),
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
        },
    })

        .then(response=>response.json())
        .then((data)=>console.log(data));
        this.setState=({
            id: "",
            fname: "",
            lname: "",
            email: "",
            gendre: "",
            company: "",
            mslevel: "",
        });
    }

    render(){
        return (
            <div className="base-container">
                <div className="content">
                    <form className="cuform">
                        <input type="text" onChange={this.changeHandler} className = "textfield" name="id" required placeholder="User ID" value={this.state.id}/>
                        <input type="text" onChange={this.changeHandler} className = "textfield" name="fname" required placeholder="First Name" value={this.state.fname}/>
                        <input type="text" onChange={this.changeHandler} className = "textfield" name="lname" required placeholder="Last Name" value={this.state.lname}/>
                        <input type="text" onChange={this.changeHandler} className = "textfield" name="email" required placeholder="Email" value={this.state.email}/>
                        <select className="dropmenu" onChange={this.changeHandler} name="mslevel" value={this.state.mslevel}>
                            <option value='1' selected="selected">MS1</option>
                            <option value='2'>MS2</option>
                            <option value='3'>MS3</option>
                            <option value='4'>MS4</option>
                            <option value='5'>MS5</option>
                        </select>
                        <select className="dropmenu" onChange={this.changeHandler} name="gendre" value={this.state.gendre}>
                            <option value="male" selected="selected">Male</option>
                            <option value="female">Female</option>
                            <option value="na">Prefer Not To Answer</option>
                        </select>
                        <select className="dropmenu" onChange={this.changeHandler} name="company" value={this.state.company}>
                            <option value="HHC">HHC</option>
                            <option value="ACO" selected="selected">ACO</option>
                            <option value="BCO">BCO</option>
                            <option value="CCO">CCO</option>
                        </select>
                        <button className="button" onClick={this.submitForm} >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    }

}