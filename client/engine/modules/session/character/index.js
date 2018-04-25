import {
	CHARACTER_GET_LIST,
} from 'libs/constants';

import React from 'react';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Container, Row, Col, Button} from 'reactstrap';

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

	derpFunction() {

	}

	render() {
		return (
			<React.Fragment>
				<Container>
					<Row>
						<Col>
						{
							!this.props.characterList &&
							<p>Loading character list...</p>
						}
						</Col>
					</Row>
					<Row>
						<Col>
							{
								this.props.characterList &&
								this.props.characterList.map((obj, index) => <CharacterCard key={index} onSelect={this.selectCharacter} character={obj} />)
							}
							<Button color="blue">Create</Button>
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
