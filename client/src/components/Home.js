import React, { Component } from 'react';
import axios from 'axios';
import Row from 'muicss/lib/react/row';
import LoginForm from './forms/LoginForm';
import SignupForm from './forms/SignupForm';
import ChatForm from './forms/ChatForm';
import { logout, isLogin, setValue, getToken } from '../utils';
import { createNotification } from '../config/notification'

const endpoint = process.env.REACT_APP_ENDPOINT
const config = {
	headers: {'Authorization': 'BEARER ' + getToken()}
}

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
		}
	}

	handleLogout = () => {
		logout();
		this.setState({
			isLogin: false
		})
	}

	getAllMessages = () => {
		axios.get(endpoint + '/messages', config)
		.then(res => {
			console.log('data-------------', res.data)
			this.setState({ messages: res.data.data })
		})
		.catch(err => {
			createNotification('error', err.message)
		})
	}

	handleLogin = (data) => {
		const { user, authenticated, chosenForm } = this.props.appState
		axios.post(endpoint + '/login', { data })
		.then(res => {
			const appState = this.props.appState
			appState.user = res.data.data.user.name
			appState.authenticated = true
			appState.chosenForm = 'chat'
			setValue({token: res.data.data.token, user: res.data.data.user.name})
			this.props.setAppState(appState)
		})
		.catch(err => {
			createNotification('error', err.message)
		})
	}

	handleSignup = (data) => {
		axios.post(endpoint + '/signup', { data })
		.then(res => {
			const appState = this.props.appState
			appState.chosenForm = 'login'
			this.props.setAppState(appState)
		})
		.catch(err => {
			createNotification('error', err.message)
		})
	}

	handleSend = (data) => {
		axios.post(endpoint + '/messages', { data }, config)
		.then(res => {
			console.log(res.data)
			this.getAllMessages()
		})
		.catch(err => {
			console.log(err.message)
			createNotification('error', err.message)
		})
	}

	renderForm = () => {
		const { user, authenticated, chosenForm } = this.props.appState
		if (authenticated) return <ChatForm sendChat={this.handleSend} />
		if (chosenForm === 'login') return <LoginForm login={this.handleLogin} />
		return <SignupForm signup={this.handleSignup} />
	}

	render() {
		return (
			<React.Fragment>
				<div className='message-board'>
					{this.state.messages.map(message => {
						return <div key={message.id}>{message.username} - {message.content} - {new Date(message.createdon).toISOString()}</div>
					})}
				</div>
				<Row className='form-board'>
					{this.renderForm()}
				</Row>
			</React.Fragment>
		);
	}
}

export default Home;