import React, { Component } from 'react';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import {UploadForm} from './components/UploadForm';
import {Dashboard} from './components/Dashboard';
import {DisplayGroups} from './components/DisplayGroups';
import {CreateGroup} from './components/CreateGroup';
import {DisplayUsers} from './components/DisplayUsers';
import './style.css';
import './bootstrapLux.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: '',
      groupdata:[],
    };
  }

  fetchGroupData(){
      fetch('http://127.0.0.1:8000/groups/')
      .then(response=>response.json())
      .then((groupdata)=>{
          this.setState({
            groupdata:groupdata
          });
      });
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/core/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        });

    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: <UploadForm/>,
          username: json.user.username
        });
      });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/core/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: <UploadForm/>,
          username: json.username
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, displayed_form: <LoginForm/>, username: '' });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  

  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      case 'upload':
        form = <UploadForm />
        break;
        case 'viewgroup':
          form = <DisplayGroups fetchGroupData={this.fetchGroupData}/>
          break;
        case 'creategroup':
          form = <CreateGroup />
          break;
        case 'viewuser':
          form = <DisplayUsers />
          break;
      default:
        form = null;
    }
    

    return (
      <div className="App">
        <BrowserRouter>
          <Nav
            logged_in={this.state.logged_in}
            display_form={this.display_form}
            handle_logout={this.handle_logout}
          />
          <div className="base-container">
            {form}
            <h3>
              {this.state.logged_in
                ? `Hello ${this.state.username}`
                : ''}
            </h3>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;