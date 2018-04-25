import React from 'react';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {CardDeck, Card, CardTitle, CardBody, Button, FormGroup, Input} from 'reactstrap';

import {newInput} from '../actions';

class Create extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
		};

		this.createCharacter = this.createCharacter.bind(this);
	}

	componentWillMount() {
		if(!this.props.loggedIn) {
			return this.props.history.push('/authentication');
		}
	}

	createCharacter() {
		const {name} = this.state;
		this.props.newInput(`createcharacter ${name}`);
	}

	render() {
		return (
			<React.Fragment>
				<CardDeck>
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
		newInput,
	}, dispatch);
}

function mapStateToProps(state) {
	return {
		loggedIn: state.account.loggedIn,
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Create));
