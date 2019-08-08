import React, { Component } from 'react';
import axios from 'axios';
import LoginForm from './forms/LoginForm';
import SignupForm from './forms/SignupForm';
import ChatForm from './forms/ChatForm';
import { logout, setValue, getToken } from '../utils';
import { createNotification } from '../config/notification'
import { connect } from '../config/api';

const endpoint = process.env.REACT_APP_ENDPOINT

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
		}
	}

	componentDidMount() {
		connect(this.connectWS, this.getAllMessages)
	}

	connectWS = (msg) => {
		if (!this.props.appState.authenticated) return
		const messages = this.state.messages
		const data = JSON.parse(msg.data)
		if (data.username) messages.push(data)
		this.setState({ messages })
		var element = document.getElementById('messages');
		element.scrollTop = element.scrollHeight; // Auto scroll to the bottom
	}

	getHeaders = () => {
		return { headers: { 'Authorization': 'BEARER ' + getToken() } }
	}

	handleLogout = () => {
		this.setState({
			isLogin: false
		})
		logout();
	}

	handleLogin = (data) => {
		axios.post(endpoint + '/login', { data })
			.then(res => {
				const appState = this.props.appState
				appState.user = res.data.data.user.name
				appState.authenticated = true
				appState.chosenForm = 'chat'
				setValue({ token: res.data.data.token, user: res.data.data.user.name })
				this.props.setAppState(appState)
				this.getAllMessages()
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
		axios.post(endpoint + '/messages', { data }, this.getHeaders())
			.catch(err => {
				console.log(err.message)
				createNotification('error', err.message)
			})
	}

	getAllMessages = () => {
		if(!this.props.appState.authenticated) return
		axios.get(endpoint + '/messages', this.getHeaders())
			.then(res => {
				this.setState({ messages: res.data.data })
				var element = document.getElementById('messages');
				element.scrollTop = element.scrollHeight; // Auto scroll to the bottom
			})
			.catch(err => {
				console.log('Network connection is not avaiable')
			})
	}

	renderForm = () => {
		const { authenticated, chosenForm } = this.props.appState
		if (authenticated) return <ChatForm sendChat={this.handleSend} />
		if (chosenForm === 'login') return <LoginForm login={this.handleLogin} />
		return <SignupForm signup={this.handleSignup} />
	}

	renderLeftMessage = (message) => {
		return (
			<div className='message-row' key={message.id}>
				<div className='chip'>
					<img src='http://www.gravatar.com/avatar/99b6814ccfb074ad6acb28ae47e5db1a'
						alt='US' />
					{message.username}
				</div>
				<div className='chip-message'>
					<span className='time'>{new Date(message.createdon).toLocaleTimeString()}</span>
					<div className='message-content-left'>{message.content}</div>
				</div>
			</div>
		)
	}

	renderRightMessage = (message) => {
		return (
			<div className='message-row-right' key={message.id}>
				<div className='chip-message-right'>
					<span className='time'>{new Date(message.createdon).toLocaleTimeString()}</span>
					<div className='message-content-right'>{message.content}</div>
				</div>
				<div className='chip'>
					{message.username}
					<img className='right-img' src='http://www.gravatar.com/avatar/99b6814ccfb074ad6acb28ae47e5db1a'
						alt='US' />
				</div>
			</div>
		)
	}

	render() {
		return (
			<div className='home-board'>
				<div className='message-board' id='messages'>
					{this.state.messages && this.state.messages.map((message, i) => {
						if (i % 2 === 0) return this.renderLeftMessage(message)
						else return this.renderRightMessage(message)
					})}
				</div>
				<div className='form-board'>
					{this.renderForm()}
				</div>
			</div>
		);
	}
}

export default Home;