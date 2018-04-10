import {
	GET_CHARACTER_LIST,
} from 'vars/constants';

import React from 'react';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {CardDeck, Card, CardTitle, CardBody, Button, FormGroup, Input} from 'reactstrap';

import {newInput} from '../actions';
import {socketSend} from '../../app/actions';

import CharacterCard from './card';

class Character extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
		};

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
			type: GET_CHARACTER_LIST,
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

	render() {
		return (
			<React.Fragment>
				{
					!this.props.characterList &&
					<p>Loading character list...</p>
				}
				<CardDeck>
					{
						this.props.characterList &&
						this.props.characterList.map((obj, index) => <CharacterCard key={index} onSelect={this.selectCharacter} character={obj} />)
					}
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
				</CardDeck>
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