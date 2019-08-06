import React, { Component } from 'react';
import axios from 'axios';
import Row from 'muicss/lib/react/row';
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
		if (this.props.appState.authenticated)
			connect(this.connectWS);
	}

	connectWS = (msg) => {
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

	getAllMessages = () => {
		axios.get(endpoint + '/messages', this.getHeaders())
			.then(res => {
				this.setState({ messages: res.data.data })
			})
			.catch(err => {
				createNotification('error', err.message)
			})
	}

	handleLogin = (data) => {
		axios.post(endpoint + '/login', { data })
			.then(res => {
				connect(this.connectWS);
				const appState = this.props.appState
				appState.user = res.data.data.user.name
				appState.authenticated = true
				appState.chosenForm = 'chat'
				setValue({ token: res.data.data.token, user: res.data.data.user.name })
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
		axios.post(endpoint + '/messages', { data }, this.getHeaders())
			.catch(err => {
				console.log(err.message)
				createNotification('error', err.message)
			})
	}

	renderForm = () => {
		const { authenticated, chosenForm } = this.props.appState
		if (authenticated) return <ChatForm sendChat={this.handleSend} />
		if (chosenForm === 'login') return <LoginForm login={this.handleLogin} />
		return <SignupForm signup={this.handleSignup} />
	}

	render() {
		return (
			<React.Fragment>
				<div className='message-board' id='messages'>
					{this.state.messages.map((message, i) => {
						return (
							<div className='message-row' key={i}>
								<div className='chip'>
									<img src='http://www.gravatar.com/avatar/99b6814ccfb074ad6acb28ae47e5db1a'
										alt='US' />
									{message.username}
								</div>
								<div className='chip-message'>
									<span className='time'>{new Date(message.createdon).toLocaleTimeString()}</span>
									<div>{message.content}</div>
								</div>
							</div>
						)
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