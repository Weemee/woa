import React from 'react';
import {Card, CardBody, Button, Progress} from 'reactstrap';

class SelectedCard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Card>
				<div>
					Name: {this.props.character.name} <br />
					Spec: {this.props.character.spec} <br />
					Stats (status): {this.props.character.stats.status}
				</div>
				<CardBody style={{backgroundColor: `${this.props.color}`}}>
					<Progress color="success" value="32" max="40">
						Health: 32
					</Progress>
				</CardBody>
			</Card>
		);
	}
}

export default SelectedCard;
