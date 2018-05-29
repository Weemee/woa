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

import PreviewCard from './previewCard';
import {setLoading} from '../../app/actions';

class Character extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			serverSelect: '',
			specialization: '',
			newName: '',
			case: {
				create: false,
				editing: '',
				preview: '',
			},
			delete: '',
			confirm: '',
		};

		this.renderContent = this.renderContent.bind(this);
		this.toggle = this.toggle.bind(this);
		this.doEdit = this.doEdit.bind(this);
		this.previewCharacter = this.previewCharacter.bind(this);
		this.deleteCharacter = this.deleteCharacter.bind(this);
		this.selectCharacter = this.selectCharacter.bind(this);
		this.createCharacter = this.createCharacter.bind(this);
		this.editCharacter = this.editCharacter.bind(this);
	}

	componentDidMount() {
		if(!this.props.loggedIn) {
			return this.props.history.push('/authentication');
		}

		this.props.socketSend({
			type: CHARACTER_GET_LIST,
			payload: null,
		});

		this.props.socketSend({
			type: GET_SERVER_LIST,
			payload: null,
		});
	}

	static getDerivedStateFromProps(props, state) {
		if(!props.notes) {
			return null;
		}

		if(props.notes.type === 'success') {
			return {
				characterList: props.characterList,
				notes: props.notes,
				name: '',
				serverSelect: '',
				newName: '',
				case: {
					create: false,
					editing: '',
					preview: '',
				},
				delete: '',
				confirm: '',
			};
		}
		
		if(props.notes.type === 'error') {
			return null;
		}

		return;
	}

	selectCharacter(name) {
		this.props.setLoading('Loading penis...');
		this.props.newInput(`selectcharacter ${name}`);
	}

	createCharacter(name, spec) {
		this.props.newInput(`createcharacter ${name} ${spec}`);
	}

	deleteCharacter(name) {
		this.props.newInput(`deletecharacter ${name}`);
	}

	editCharacter(name, newName) {
		this.props.newInput(`editcharacter ${name} ${newName}`);
		this.props.socketSend({
			type: GET_SERVER_LIST,
			payload: null,
		});
	}

	renderContent() {
		//Add explanation to it
		const specs = [
			{
				name: 'Arithmetic',
				description: 'is a very smart person when it comes to numbers! 01+11=100 (or 4 if you prefer), easy!',
			},
			{
				name: 'Capitalist',
				description: 'is the one the loves money. More money, more love. More love, more fun!',
			},
			{
				name: 'Casual',
				description: 'is a casual pleb. Nothing special...',
			},
			{
				name: 'Collector',
				description: 'is someone to keep an eye on. Before you know it, everything there is to collect is gone in a jiffy. Speedy speedy!',
			},
			{
				name: 'Engineer',
				description: 'is THE tinkerer. Without the Engineer, there would not be anything else. Please thank the Engineer next time you her/him.',
			},
			{
				name: 'Explorer',
				description: 'is maybe not around for the cruical times. But who cares? There is an entire universe to explore, let us go!',
			},
			{
				name: 'Farmer',
				description: 'is not the person you bring to a party. Farming, harvesting, producing and repeat. No time for parties, out me way!',
			},
			{
				name: 'Scientist',
				description: 'is perhaps the most tricky individual to understand. What is the science for? Any specific subject? NO, FOR SCIENCE!',
			},
		];
		if (this.state.case.create) {
			return (
				<div>
					<Card>
						<CardBody>
							<CardTitle>Create character</CardTitle>
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
									value={this.state.serverSelect}
								>
									<option value="" defaultValue hidden>Select server</option>
									{
										Object.keys(this.props.serverMaps).map((serverID) => {
											return <option key={serverID} value={`"${this.props.serverMaps[serverID].name}"`}>{this.props.serverMaps[serverID].name}</option>
										})
									}
								</Input>
							</FormGroup>
							<FormGroup>
								<Input
									type='select'
									onChange={(e) => {
										this.setState({
											specialization: e.target.value,
										});
									}}
									value={this.state.specialization}
								>
									<option value="" defaultValue hidden>Select specialization</option>
									{
										Object.keys(specs).map((index) => {
											return <option key={index} value={index}>{specs[index].name}</option>
										})
									}
								</Input>
							</FormGroup>
							{
								this.state.specialization &&
								<div>
									Description: <b>{specs[this.state.specialization].name}</b> <br />
									The <b>{specs[this.state.specialization].name}</b> {specs[this.state.specialization].description}
								</div>
							}
							<Button color='blue' block={true} onClick={() => this.createCharacter(this.state.name, specs[this.state.specialization].name)}>Create character</Button>
						</CardBody>
					</Card>
				</div>
			);
		}
		if(this.state.case.preview) {
			return (
				<div>
					<Card>
						<CardBody>
						<CardTitle>Preview character</CardTitle>
							{this.state.case.preview} <Button color='dark' onClick={() => this.doEdit(this.state.case.preview)}>Edit</Button>
							<br />
							<Button color='blue' onClick={() => this.selectCharacter(this.state.case.preview)}>Play character</Button>
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
									<Button color='red' onClick={() => this.deleteCharacter(this.state.case.preview)}>Delete character</Button>
								) : (
									<Button color='red' disabled>Delete character</Button>
								)
							}
						</CardBody>
					</Card>
				</div>
			);
		}
		if(this.state.case.editing) {
			return (
				<div>
					<Card>
						<CardBody>
						<CardTitle>Edit character</CardTitle>
							Current name: {this.state.case.editing}
							<br />

							<FormGroup>
								<Input
									type="text"
									placeholder="New name"
									onChange={(e) => {
										this.setState({
											newName: e.target.value,
										});
									}}
									value={this.state.newName}
								/>
							</FormGroup>

							<div>
								Type in 'CONFIRM' in the input field to activate the button
							</div>
							<FormGroup>
								<Input
									type="text"
									placeholder="CONFIRM"
									onChange={(e) => {
										this.setState({
											confirm: e.target.value,
										});
									}}
									value={this.state.confirm}
								/>
							</FormGroup>
							{
								this.state.confirm === 'CONFIRM' ? (
									<Button color='blue' onClick={() => this.editCharacter(this.state.case.editing, this.state.newName)}>Edit character</Button>
								) : (
									<Button color='blue' disabled>Edit character</Button>
								)
							}
						</CardBody>
					</Card>
				</div>
			);
		} else {
			return (
				<div>
					Show stuff
				</div>
			);
		}
	}

	toggle() {
		this.setState({
			case: {
				create: !this.state.case.create,
			},
			delete: '',
			confirm: '',
		});
	}

	doEdit(name) {
		if(this.state.case.create) {
			this.toggle();
		}
		this.setState ({
			name: '',
			serverSelect: '',
			newName: '',
			case: {
				preview: '',
				editing: name,
			},
			delete: '',
			confirm: '',
		});
	}

	previewCharacter(name) {
		if(this.state.case.create) {
			this.toggle();
		}
		this.setState ({
			name: '',
			serverSelect: '',
			newName: '',
			case: {
				preview: name,
				editing: '',
			},
			delete: '',
			confirm: '',
		});
	}

	render() {
		return (
			<React.Fragment>
				<Container>
					<Row>
						<Col xs="6" sm="9">
							<Notes />
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
										
											obj.name === `${this.state.case.preview}` ? (
											<PreviewCard key={index} onClick={this.previewCharacter} character={obj} color="pink"/>
											) : (
												<PreviewCard key={index} onClick={this.previewCharacter} character={obj} color="white"/>
											)
									)
								}
								{
									!this.state.case.create &&
									<Button color='blue' block={true} onClick={this.toggle}>New character</Button>
								}
								{
									this.state.case.create &&
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
		setLoading,
	}, dispatch);
}

function mapStateToProps(state) {
	return {
		notes: state.app.notes,
		serverMaps: state.session.servers,
		socket: state.app.socket,
		character: state.character.selected,
		characterList: state.character.list,
		loggedIn: state.account.loggedIn,
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Character));
