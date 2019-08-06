import React from 'react';
import Appbar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';
import { logout } from '../utils' 

class Header extends React.Component {
	constructor(props) {
		super(props)
  }
  
  logout = () => {
    const state = this.props.appState
    logout()
    state.authenticated = false
    state.chosenForm = 'login'
    state.user = ''
    this.props.setAppState(state)
  }

  setLogin = () => {
    const state = this.props.appState
    state.chosenForm = 'login'
    this.props.setAppState(state)
  }

  setSingup = () => {
    const state = this.props.appState
    state.chosenForm = 'signup'
    this.props.setAppState(state)
  }

	render() {
		let s1 = {verticalAlign: 'middle'};
    const { user, authenticated, chosenForm } = this.props.appState
    return (
      <Appbar>
       <table width="100%">
         <tbody>
           <tr style={s1}>
             <td className="mui--appbar-height">
              <span className='logo'>Simple Chat</span>
             </td>
             <td className="mui--appbar-height nav-right" >
              {user && <span className='username'><i className='fas fa-user' /> {user}</span>}
              {authenticated && <Button color="danger" onClick={this.logout}>Logout</Button>}
              {!authenticated && (
                <React.Fragment>
                  <Button color="danger" onClick={this.setLogin}>Login</Button>
                  <Button color="danger" onClick={this.setSingup}>Signup</Button>
                </React.Fragment>
              )}
             </td>
           </tr>
         </tbody>
       </table>
      </Appbar>
    );
	}
}

export default Header