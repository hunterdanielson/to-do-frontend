import React, { Component } from 'react'
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
    Link,
} from "react-router-dom";
// import Todos from './Todos.js';
import SignUp from './SignUp.js'
import SignIn from './SignIn.js'
// import PrivateRoute from './PrivateRoute.js';

export default class App extends Component {
  state = { token: localStorage.getItem('TOKEN') }

  handleTokenChange = (myToken) => {
    this.setState({ token: myToken });
    localStorage.setItem('TOKEN', myToken);
  }

  render() {
    return (
      <div>
        <Router>
          <ul>
            { this.state.token && <div>Welcome, user!!!</div> }
            { this.state.token && <Link to="/todos"><div>Todos</div></Link> }
            <Link to="/signin"><div>Sign in</div></Link>
            <Link to="/signup"><div>Sign up</div></Link>
            <button onClick={() =>this.handleTokenChange('')}>Logout</button>
          </ul>
          <Switch>
            <Route exact path='/signin' render={(routerProps) => <SignIn 
                handleTokenChange={this.handleTokenChange} 
                {...routerProps} />} 
              />
            <Route 
            exact path='/signup' 
              render={(routerProps) => <SignUp 
                handleTokenChange={this.handleTokenChange} 
                {...routerProps}/>} 
              />
            {/* <PrivateRoute 
              exact 
              path='/todos' 
              token={this.state.token} 
              render={(routerProps) => <Todos 
              {...routerProps} />} /> */}
          </Switch>
        </Router>
      </div>
    )
  }
}