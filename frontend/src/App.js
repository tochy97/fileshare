import React, { Component } from 'react';
import axios from 'axios';
import Nav from './components/Nav';
import Login from './components/Auth/Login';
import Loginerror from './components/Auth/Loginerror';
import Signup from './components/Auth/Signup';
import {Upload} from './components/Upload';
import {ViewGroups} from './components/Views/ViewGroups';
import {CreateGroup} from './components/CreateGroup';
import {ViewUsers} from './components/Views/ViewUsers';
import {Home} from './components/Home';
import './style.css';
import './bootstrapLux.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: '',
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      axios.get('http://127.0.0.1:8000/core/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        }
      })
      .then((user) => {
        this.state.username = user.data.username;
      })
      .catch((err) => {   
        if(err.response.status==401){
          localStorage.removeItem('token');
          this.setState({ logged_in: false, displayed_form: 'login', username: '' });
        }
      });  
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/token_auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
      localStorage.setItem('token', json.token);
      this.setState({
        logged_in: true,
        displayed_form: 'home',
        username: json.user.username
      });
    })
    .catch((err) => {
      localStorage.removeItem('token');
      alert("Incorrect Username of Password");
    });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/core/userlist/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
      localStorage.setItem('token', json.token);
      this.setState({
        logged_in: true,
        displayed_form: 'home',
        username: json.username
      });
    })
    .catch((err) => {
      console.log(err);
    });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, displayed_form: 'login', username: '' });
  };

  display_form = (form) => {
    this.setState({
      displayed_form: form
    });
  };

  

  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <Login handle_login={this.handle_login} />;
        break;
      case 'loginerror':
        form = <Loginerror handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <Signup handle_signup={this.handle_signup} />;
        break;
      case 'upload':
        form = <Upload />
        break;
      case 'viewgroup':
        form = <ViewGroups/>
        break;
      case 'creategroup':
        form = <CreateGroup />
        break;
      case 'viewuser':
        form = <ViewUsers />
        break;
      case 'home':
        form = <Home />
        break;
      default:
        form = null;
    }
    

    return (
      <div className="App">
        <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        />
        <div className="base-container">
          { 
            this.state.logged_in
            ?
              <>{
                this.state.displayed_form
                ?
                  <>{form}</>
                :
                  <Home/>
              }</>
              
              :
              <>{
                this.state.displayed_form
                ?
                  <>{form}</>
                :
                  <Login handle_login={this.handle_login} />
              }</>
          }
        </div>
      </div>
    );
  }
}

export default App;