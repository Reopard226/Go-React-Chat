import React, { Component } from 'react';
import './App.css';
import './components/style.css'
import 'react-toastify/dist/ReactToastify.min.css'
import Header from './components/Header';
import Home from './components/Home';
import { getUser, isLogin } from './utils'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: getUser(),
      authenticated: isLogin(),
      chosenForm: 'login',
      messages: []
    }
  }

  setAppState = (state) => this.setState(state)

  render() {
    return (
      <React.Fragment>
        <Header appState={this.state} setAppState={this.setAppState} />
        <div className='home'>
          <Home appState={this.state} setAppState={this.setAppState} />
        </div>
      </React.Fragment>
      
    );
  }
}

export default App;
