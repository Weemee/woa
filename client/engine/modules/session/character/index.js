import {
	CHARACTER_GET_LIST,
	GET_SERVER_LIST,
	GET_SPEC_LIST,
	GET_DIFF_LIST,
	CHARACTER_LOGOUT,
} from 'libs/constants';

import React from 'react';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Card, CardBody, CardDeck, CardTitle, Input, FormGroup, Container, Row, Col, Button} from 'reactstrap';

import {newInput} from '../actions';
import {socketSend} from '../../app/actions';

import Notes from '../../ui/notes';

import PreviewCard from './previewCard';
import ListCard from './listCard';
import CreateCard from './createCard';
import EditCard from './editCard';

import {setLoading} from '../../app/actions';
import {getAccountDetails} from '../../account/actions';

class Character extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			case: {
				type: 'preview',
				last: '',
				data: '',
			}
		};

		this.toggle = this.toggle.bind(this);
		this.handleInput = this.handleInput.bind(this);

		this.deleteCharacter = this.deleteCharacter.bind(this);
		this.selectCharacter = this.selectCharacter.bind(this);
		this.createCharacter = this.createCharacter.bind(this);
		this.editCharacter = this.editCharacter.bind(this);
	}

	componentDidMount() {
		if(!this.props.loggedIn) {
			if(this.props.character) {
				this.props.socketSend({
					type: CHARACTER_LOGOUT,
					payload: null,
				});
			}
			return this.props.history.push('/authentication');
		}

		this.props.getAccountDetails(this.props.account.id, this.props.authToken);

		this.props.socketSend({
			type: CHARACTER_GET_LIST,
			payload: null,
		});

		this.props.socketSend({
			type: GET_SERVER_LIST,
			payload: null,
		});

		this.props.socketSend({
			type: GET_SPEC_LIST,
			payload: null,
		});

		this.props.socketSend({
			type: GET_DIFF_LIST,
			payload: null,
		});
	}

	static getDerivedStateFromProps(props, state) {
		//Can probably be improved, can't be arsed right now <.<
		if(props.account) {
			const type = state.case.type;
			console.log('\nAccount, charID: ', props.account.lastCharPlayed);
			console.log('\nAdmin:', props.admin);
			if(props.characterList) {
				console.log('Character list exists!');
				if(!state.case.preview) {
					console.log('No preview');
					if(props.characterList !== state.characterList) {
						if(!props.notes) {
							console.log('\tNo notes');
							if(props.account.lastCharPlayed) {
								const lastPlayed = props.characterList.find((obj) => obj.charID === props.account.lastCharPlayed);
								console.log('No new last played character: ', lastPlayed);
								if(!lastPlayed) {
									return null;
								}
								return {
									case: {
										type: type,
										data: lastPlayed.name,
									}
								};
							}
							return null;
						}
						if(props.notes.type === 'success') {
							console.log('success');
							if(props.characterList !== state.characterList) {
								console.log('Change in list');
								if(props.characterList <= 0) {
									console.log('Empty block array');
									if(props.characterList) {
										const propsBool = props.characterList.map((obj) => obj);
										if(!Boolean(propsBool.length)) {
											return {
												characterList: null,
											}
										}
									}
								}
							} 
						}

						console.log('Difference in character list (props & state !==), updating...');
						const a = props.characterList.length - 1;
						console.log('Props: ', props.characterList[a].name);

						return {
							characterList: props.characterList,
							case: {
								type: 'preview',
								data: props.characterList[a].name,
							},
						};
					}
					else {
						const lastPlayed = props.characterList.find((obj) => obj.charID === props.account.lastCharPlayed);
						console.log('No new last played character: ', lastPlayed);
						if(!lastPlayed) {
							return null;
						}
						return {
							case: {
								type: type,
								data: lastPlayed.name,
							}
						};
					}
				}
			}

			if(props.account.lastCharPlayed) {
				if(props.characterList) {
					const lastPlayed = props.characterList.find((obj) => obj.charID === props.account.lastCharPlayed);
					console.log('\nLast woho:', lastPlayed);
					return {
						case: {
							data: lastPlayed.name,
						}
					}
				}
			}
		}

		if(!props.notes) {
			return null;
		}

		if(props.notes.type === 'success') {
			return {
				characterList: props.characterList,
				notes: props.notes,
			};
		}
		
		if(props.notes.type === 'error') {
			return null;
		}

		return null;
	}

	selectCharacter(name) {
		//this.props.setLoading('Loading penis...');
		this.props.newInput(`selectcharacter ${name}`);
	}

	createCharacter(name, spec, difficulty, server) {
		this.props.newInput(`createcharacter ${name} ${spec} ${difficulty} ${server}`);
	}

	deleteCharacter(name) {
		this.props.newInput(`deletecharacter ${name}`);
	}

	editCharacter(name, newName) {
		this.props.newInput(`editcharacter ${name} ${newName}`);
	}

	handleInput(input) {
		console.log(input);
		if(!input) {
			return;
		}
		const type = input.type;

		if(type === 'play') {
			this.selectCharacter(input.name);
		}

		if(type === 'preview') {
			this.toggle(input.type, input.name);
		}

		if(type === 'edit') {
			this.toggle(input.type);
		}

		if(type === 'editDone') {
			this.editCharacter(input.oldName, input.newName);
		}

		if(type === 'delete') {
			this.deleteCharacter(input.name);
		}

		if(type === 'create') {
			this.createCharacter(input.object.name, input.object.spec, input.object.difficulty, input.object.server);
		}
	}

	toggle(newCase, data) {
		if(!data) {
			data = this.state.case.data;
		}
		this.setState({
			case: {
				type: newCase,
				last: this.state.case.type,
				data: data,
			}
		});
	}

	render() {
		return (
			<React.Fragment>
				<Container className="themeContainer">
					<Row>
						<Col xs="6" sm="9">
							<Notes />
							{
								this.state.case.type === 'create' &&
								<CreateCard onClick={this.handleInput} serverMaps={this.props.serverMaps} specializations={this.props.specializations} difficulties={this.props.difficulties}/>
							}
							{
								this.state.case.type === 'preview' &&
								this.props.characterList &&
								this.props.characterList.map((obj, index) =>
									obj.name === this.state.case.data &&
									<PreviewCard key={index} onClick={this.handleInput} character={obj} color="pink"/>
								)
							}
							{
								this.state.case.type === 'edit' &&
								this.props.characterList &&
								this.props.characterList.map((obj, index) =>
									obj.name === this.state.case.data &&
									<EditCard key={index} onClick={this.handleInput} character={obj} color="pink"/>
								)
							}
						</Col>

							<Col xs="6" sm="3">
								{
									!this.props.characterList &&
									<p>Loading character list...</p>
								}
								{
									this.props.characterList &&
									this.props.characterList.map((obj, index) =>
										obj.name === `${this.state.case.data}` ? (
											<ListCard key={index} onClick={this.handleInput} character={obj} color="pink"/>
										) : (
											<ListCard key={index} onClick={this.handleInput} character={obj} color="white"/>
										)
									)
								}
								{
									this.state.case.type !== 'create' &&
									<button className="themeButton" color='blue' block='true' onClick={() => this.toggle('create')}>New character</button>
								}
								{
									this.state.case.type === 'create' &&
									<button className="themeButton" color='red' block='true' onClick={() => this.toggle(this.state.case.last)}>Back</button>
								}

							</Col>
					</Row>
				</Container>
			</React.Fragment>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		socketSend,
		newInput,
		setLoading,
		getAccountDetails,
	}, dispatch);
}

function mapStateToProps(state) {
	return {
		account: state.account.account,
		notes: state.app.notes,
		serverMaps: state.session.servers,
		socket: state.app.socket,
		admin: state.app.adminLoad,
		character: state.character.selected,
		characterList: state.character.list,
		specializations: state.character.specializations,
		difficulties: state.character.difficulties,
		loggedIn: state.account.loggedIn,
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Character));
