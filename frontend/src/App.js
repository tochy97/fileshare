import React from 'react';
import {CreateUser} from './CreateUser';
import {CreateGroup} from './CreateGroup';
import {Login} from './Login';
import {DisplayGroups} from './DisplayGroups';
import {DisplayUsers} from './DisplayUsers';
import {Navigation} from './Navigation';
import {Footer} from './Footer';
import './style.css'
import './footer.css'
import './bootstrapLux.css'
import './tables.css'

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="container">

        <Navigation/>
        <Footer/>

        <Switch>
          <Route path='/Login' component={Login} exact/>
          <Route path='/CreateUser' component={CreateUser} exact/>
          <Route path='/CreateGroup' component={CreateGroup} exact/>
          <Route path='/DisplayGroups' component={DisplayGroups} exact/>
          <Route path='/DisplayUsers' component={DisplayUsers} exact/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
