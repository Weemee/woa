import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {newEvent} from './'
import {gameLogout, newInput} from './actions';
import {socketSend} from '../app/actions';

import {Container, Row, Col, Input, Button, Form} from 'reactstrap';
import Character from './character';
import CharacterCard from './character/card';

class Session extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			sidebar: 'players',
		};

		this.isActiveTab = this.isActiveTab.bind(this);
		this.sendAction = this.sendAction.bind(this);
	}

	componentWillMount() {
		if(!this.props.loggedIn) {
			return this.props.history.push('/authentication');
		}

		document.addEventListener('keydown', this.onKeyPress.bind(this));
	}

	componentWillUnmount() {
		this.props.gameLogout();

		document.removeEventListener('keydown', this.onKeyPress.bind(this));
	}

	componentDidUpdate(prevProps) {
		if(!this.props.character) {
			return;
		}
	}

	onKeyPress(e) {
		if(!this.props.character) {
			return;
		}

		if(document.activeElement.value) {
			return;
		}

		//Keystate switch
	}

	isActiveTab(tabName) {
		return this.state.sidebar === tabName ? 'active' : '';
	}

	sendAction(action) {
		this.props.socketSend(action);
	}

	renderUI() {
		if(!this.props.character) {
			return <Character />;
		}

		return (
			<div className="UI">
				<Container>
					<Row>
						<Col className="left">
							<CharacterCard character={this.props.character} />
							<div style={{textAlign: 'center'}}>
								{this.props.connection.lastEvent}<br/>
								{!this.props.connection.isConnected}
								<div mode="indeterminate" />
							</div>
						</Col>

						<Col sm="9" className="middle">

						</Col>
					</Row>
				</Container>
			</div>
		);
	}

	render() {
		return (
			<React.Fragment>
				<div id="session">
					{this.renderUI()}
				</div>
			</React.Fragment>
		);
	}
}

function mapActionsToProps(dispatch) {
	return bindActionCreators({
		socketSend,
		gameLogout,
	}, dispatch);
}

function mapStateToProps(state) {
	return {
		session: {...state.session},
		character: state.character.selected,
		players: state.session.players,
		socket: state.app.socket,
		loggedIn: state.account.loggedIn,
		authToken: state.account.authToken,
		connection: {
			isConnected: state.app.connected,
			lastEvent: state.app.connectedEvent,
		},
	};
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Session));
