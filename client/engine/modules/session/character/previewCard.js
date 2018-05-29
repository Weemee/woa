import React from 'react';
import {Card, CardBody, Button, Progress} from 'reactstrap';

class PreviewCard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Card className="characterCard" onClick={() => this.props.onClick(this.props.character.name)}>
				<div>
					{this.props.character.name}
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

export default PreviewCard;
