import React from 'react';
import {CreateUser} from './CreateUser';
import {Login} from './Login';
import {DisplayUser} from './DisplayUser';
import {Navigation} from './Navigation';
import {Footer} from './Footer';
import {Survey} from './Survey';
import {Hub} from './Hub';
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
          <Route path='/CreateUser' component={CreateUser}/>
          <Route path='/DisplayUser' component={DisplayUser}/>
          <Route path='/Hub' component={Hub} exact/>
          <Route path='/Survey' component={Survey} exact/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
