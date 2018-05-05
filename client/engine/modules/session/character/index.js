import {
	CHARACTER_GET_LIST,
} from 'libs/constants';

import React from 'react';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Card, CardBody, CardDeck, CardTitle, Input, FormGroup, Container, Row, Col, Button} from 'reactstrap';

import {newInput} from '../actions';
import {socketSend} from '../../app/actions';

import CharacterCard from './card';

class Character extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			create: false,
		};

		this.selectCharacter = this.selectCharacter.bind(this);
		this.toggle = this.toggle.bind(this);
		this.renderContent = this.renderContent.bind(this);
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
	}

	selectCharacter(name) {
		this.props.newInput(`selectcharacter ${name}`);
	}

	createCharacter() {
		const {name} = this.state;
		this.props.newInput(`createcharacter ${name}`);
		this.toggle();
	}

	renderContent() {
		if (this.state.create) {
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
							<Button color='blue' block={true} onClick={this.createCharacter}>Create character</Button>
						</CardBody>
					</Card>
				</div>
			);
		} else {
			return (
				<div>
					Show character
				</div>
			);
		}
	}

	toggle() {
		this.setState({
			create: !this.state.create,
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
								this.props.characterList.map((obj, index) => <CharacterCard key={index} onSelect={this.selectCharacter} character={obj} />)
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
		socket: state.app.socket,
		character: state.character.selected,
		characterList: state.character.list,
		loggedIn: state.account.loggedIn,
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Character));
