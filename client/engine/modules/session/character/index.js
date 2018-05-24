import {
	CHARACTER_GET_LIST,
	GET_SERVER_LIST,
} from 'libs/constants';

import React from 'react';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Card, CardBody, CardDeck, CardTitle, Input, FormGroup, Container, Row, Col, Button} from 'reactstrap';

import {newInput} from '../actions';
import {socketSend} from '../../app/actions';

import Notes from '../../ui/notes';

import CharacterCard from './card';

class Character extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			serverSelect: '',
			delete: '',
			create: false,
			preview: '',
		};

		this.renderContent = this.renderContent.bind(this);
		this.toggle = this.toggle.bind(this);
		this.previewCharacter = this.previewCharacter.bind(this);
		this.deleteCharacter = this.deleteCharacter.bind(this);
		this.selectCharacter = this.selectCharacter.bind(this);
		this.createCharacter = this.createCharacter.bind(this);
	}

	componentWillMount() {
		if(!this.props.loggedIn) {
			return this.props.history.push('/authentication');
		}
	}

	componentDidMount() {
		this.props.socketSend({
			type: CHARACTER_GET_LIST,
			payload: null,
		});

		this.props.socketSend({
			type: GET_SERVER_LIST,
			payload: null,
		});
	}

	selectCharacter(name) {
		this.props.newInput(`selectcharacter ${name}`);
	}

	createCharacter() {
		const {name} = this.state;
		this.props.newInput(`createcharacter ${name}`);
	}

	deleteCharacter(name) {
		this.props.newInput(`deletecharacter ${name}`);
		this.setState({
			name: '',
			serverSelect: '',
			delete: '',
			create: false,
			preview: '',
		});
	}

	renderContent() {
		if (this.state.create) {
			return (
				<div>
					<Card>
						<CardBody>
							<CardTitle>Create character</CardTitle>
							<Notes />
							<FormGroup>
								<Input
									type="text"
									placeholder="Character name"
									onChange={(e) => {
										this.setState({
											name: e.target.value,
										});
									}}
									value={this.state.name}
								/>
							</FormGroup>
							<FormGroup>
								<Input
									type='select'
									onChange={(e) => {
										this.setState({
											serverSelect: e.target.value,
										});
									}}
									value={this.state.location}
								>
									<option value="" defaultValue hidden>Select server</option>
									{
										Object.keys(this.props.serverMaps).map((serverID) => {
											return <option key={serverID} value={`"${this.props.serverMaps[serverID].name}"`}>{this.props.serverMaps[serverID].name}</option>
										})
									}
								</Input>
							</FormGroup>
							<Button color='blue' block={true} onClick={this.createCharacter}>Create character</Button>
						</CardBody>
					</Card>
				</div>
			);
		}
		if(this.state.preview) {
			return (
				<div>
					<Card>
						<CardBody>
						<CardTitle>Preview character</CardTitle>
							{this.state.preview}

							<Button color='blue' block={true} onClick={() => this.selectCharacter(this.state.preview)}>Play character</Button>
							<div>
								<br />
								Type in 'DELETE' in the input field to activate the button
							</div>

							<FormGroup>
								<Input
									type="text"
									placeholder="DELETE"
									onChange={(e) => {
										this.setState({
											delete: e.target.value,
										});
									}}
									value={this.state.delete}
								/>
							</FormGroup>
							{
								this.state.delete === 'DELETE' ? (
									<Button color='red' block={true} onClick={() => this.deleteCharacter(this.state.preview)}>Delete character</Button>
								) : (
									<Button color='red' block={true} onClick={() => this.deleteCharacter(this.state.preview)} disabled>Delete character</Button>
								)
							}
						</CardBody>
					</Card>
				</div>
			);
		} else {
			return (
				<div>
					<Notes />
					Show stuff
				</div>
			);
		}
	}

	toggle() {
		this.setState({
			create: !this.state.create,
			delete: '',
		});
	}

	previewCharacter(name) {
		if(this.state.create) {
			this.toggle();
		}
		this.setState ({
			name: '',
			serverSelect: '',
			delete: '',
			preview: name,
		});
	}

	render() {
		return (
			<React.Fragment>
				<Container>
					<Row>
						<Col xs="6" sm="9">
							{this.renderContent()}
						</Col>

							<Col xs="6" sm="3">
								{
									!this.props.characterList &&
									<p>Loading character list...</p>
								}
								{
									this.props.characterList &&
									this.props.characterList.map((obj, index) => 
										
											obj.name === `${this.state.preview}` ? (
											<CharacterCard key={index} onClick={this.previewCharacter} character={obj} color="pink"/>
											) : (
												<CharacterCard key={index} onClick={this.previewCharacter} character={obj} color="white"/>
											)
									)
								}
								{
									!this.state.create &&
									<Button color='blue' block={true} onClick={this.toggle}>New character</Button>
								}
								{
									this.state.create &&
									<Button color='red' block={true} onClick={this.toggle}>Back</Button>
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
	}, dispatch);
}

function mapStateToProps(state) {
	return {
		serverMaps: state.session.servers,
		socket: state.app.socket,
		character: state.character.selected,
		characterList: state.character.list,
		loggedIn: state.account.loggedIn,
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Character));
