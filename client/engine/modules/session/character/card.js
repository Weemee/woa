import React from 'react';
import {Card, CardBody, Button, Progress} from 'reactstrap';


class CharacterCard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Card className="characterCard">
				<div>{this.props.character.name}</div>
			</Card>
		);
	}
}

export default CharacterCard;