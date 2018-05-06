import React from 'react';
import {Card, CardBody, Button, Progress} from 'reactstrap';


class CharacterCard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Card className="characterCard">
				{
					this.props.onSelect &&
					<div onClick={() => this.props.onSelect(this.props.character.name)}>
						{this.props.character.name}
					</div>
				}
			</Card>
		);
	}
}

export default CharacterCard;
