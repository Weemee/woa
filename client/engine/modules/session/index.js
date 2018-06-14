import {
	GET_THEME_LIST,
} from 'libs/constants';

import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {gameLogout} from './actions';
import {socketSend} from '../app/actions';

import Character from './character';

import TestThree from './three';
import Interface from './interface';
import ConfigUI from './interface/config'
import {setLanguage} from '../localization/actions';

import {MdAddCircleOutline} from 'react-icons/lib/md';

class Session extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			sidebar: 'players',
			editGrid: false,
			left: false,
			top: false,
			right: false,
			middle: false,
			bottomRight: false,
			bottomLeft: false,
		};

		this.isActiveTab = this.isActiveTab.bind(this);
		this.sendAction = this.sendAction.bind(this);
		this.toggleGrid = this.toggleGrid.bind(this);
	}

	componentDidMount() {
		if(!this.props.loggedIn) {
			return this.props.history.push('/authentication');
		}

		this.props.setLanguage(this.props.account.language);

		this.props.socketSend({
			type: GET_THEME_LIST,
			payload: null,
		});

		document.addEventListener('keydown', this.onKeyPress.bind(this));
	}

	componentWillUnmount() {
		this.props.gameLogout();

		document.removeEventListener('keydown', this.onKeyPress.bind(this));
	}

	//Change all these to static getDerivedStateFromProps()
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

	toggleGrid() {
		this.setState({
			editGrid: !this.state.editGrid,
		});
	}

	renderUI() {
		if(!this.props.character) {
			return <Character />;
		}

		return (
			<React.Fragment>
				{
					this.state.editGrid &&
					<div>
						<ConfigUI />
						<div className="toggleGridBtn">
							<a href="#" onClick={this.toggleGrid} className="themeButton"><MdAddCircleOutline /> Grid</a>
						</div>
					</div>
				}
				{
					!this.state.editGrid &&
					<div>
						<div className="toggleGridBtn">
							<a href="#" onClick={this.toggleGrid} className="themeButton"><MdAddCircleOutline /> Grid</a>
						</div>
						<Interface character={this.props.character}/>
					</div>
				}
			</React.Fragment>
		);
	}

	render3DGraphics() {
		if(!this.props.character) {
			return;
		}

		return (
			<div>
				{<TestThree />}
			</div>
		);
	}

	render() {
		return (
			<React.Fragment>
				<div id="session" className="themeContainer">
					{this.render3DGraphics()}
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
		setLanguage,
	}, dispatch);
}

function mapStateToProps(state) {
	return {
		session: {...state.session},
		character: state.character.selected,
		players: state.session.players,
		socket: state.app.socket,
		loggedIn: state.account.loggedIn,
		account: state.account.account,
		authToken: state.account.authToken,
		connection: {
			isConnected: state.app.connected,
			lastEvent: state.app.connectedEvent,
		},
	};
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Session));
